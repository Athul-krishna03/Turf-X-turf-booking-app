import React, { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {  paymentService, slotUpdate } from "../../services/user/userServices";
import { toast } from "sonner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

interface PaymentFormProps {
  date:string
  slotId: string;
  price: number;
  durarion:number;
  onSuccess: () => void;
  onError?: () => void;
  playerCount?:number
  paymentType:"single" | "full" | "shared"
}

const PaymentForm: React.FC<PaymentFormProps & { clientSecret: string,slotLockId:string}> = ({
  date,
  slotId,
  price,
  durarion,
  onSuccess,
  clientSecret,
  slotLockId,
  paymentType,
  playerCount
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      
      const submitResult = await elements.submit();
      if (submitResult.error) {
        setError(submitResult.error.message || "Failed to submit payment form");
        setProcessing(false);
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: window.location.href, 
        },
        redirect: "if_required", 
      });

      if (result.error) {
        setError(result.error.message || "Payment failed");
        setProcessing(false);
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        await slotUpdate(
          date,
          slotId,
          price,
          durarion,
          result.paymentIntent.id,
          slotLockId,
          paymentType,
          playerCount
        )
        setProcessing(false);
        onSuccess();
      }
    } catch (error:any) {
      setError(error.message ||"An error occurred during payment");
      setProcessing(false);
      toast.error(error.message);
      console.error("Payment error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2 text-white">
          Pay {price.toLocaleString()} INR
        </label>
        <PaymentElement
          options={{
            layout: "tabs",
            defaultValues: {
              billingDetails: {
                name: "Customer Name",
              },
            },
          }}
          className="p-2 border rounded bg-gray-800 text-white"
        />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-gradient-to-r from-green-700 to-green-600 text-white py-2 rounded disabled:bg-gray-400 hover:from-green-800 hover:to-green-700 transition-all duration-300"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default function PaymentWrapper({date, slotId, price,durarion, onSuccess,onError,paymentType,playerCount}: PaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [slotLockId, setSlotLockId] = useState<string>("");

  const hasFetched = useRef(false); 

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (hasFetched.current) return; 
      hasFetched.current = true;

      try {
        const response = await paymentService(slotId, price);
        console.log("payment service res",response);
        setClientSecret(response.data.clientSecret);
        setSlotLockId(response.data.lockId);
      } catch (error) {
        toast.error( "slot unavailable");
        if(onError) onError()
        console.error("Failed to fetch client secret", error);
      }
    };

    fetchClientSecret();
  }, [slotId, price]);


  const options = clientSecret
    ? {
        clientSecret,
        appearance: {
          theme: "flat" as const,
          labels: "floating" as const,
        },
        layout: "tabs",
        fields: {
          billingDetails: {
            name: "never",
            email: "never",
            phone: "never",
            address: {
              country: "never",
              postalCode: "never",
              line1: "never",
              line2: "never",
              city: "never",
              state: "never",
            },
          },
        },
      }
    : undefined;

  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={options}>
        <PaymentForm
          slotId={slotId}
          price={price}
          date={date}
          durarion={durarion}
          onSuccess={onSuccess}
          clientSecret={clientSecret}
          slotLockId={slotLockId}
          paymentType={paymentType || "single"}
          playerCount={playerCount}
          />
      </Elements>
    )
  );
}