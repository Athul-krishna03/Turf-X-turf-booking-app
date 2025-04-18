import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { turfvalidationSchema } from "../../utils/turfValidation";
import { TurfFormValues } from "../../types/Type";

interface PhotoPreview {
  file: File;
  preview: string;
}
interface SignupFormProps {
  onSubmit: (
    values: TurfFormValues,
    formikHelpers: { setSubmitting: (isSubmitting: boolean) => void }
  ) => void;
}

const  TurfRegisterForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [photoPreview, setPhotoPreview] = useState<PhotoPreview[]>([]);
  const [amenityInput, setAmenityInput] = useState<string>("");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
    values: TurfFormValues
  ): void => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFiles = Array.from(e.target.files);
    const newPreviews = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFieldValue("turfPhotos", [...values.turfPhotos, ...selectedFiles]);
    setPhotoPreview((prev) => [...prev, ...newPreviews]);
  };
  const removePhoto = (
    index: number,
    setFieldValue: (field: string, value: any) => void,
    values: TurfFormValues
  ): void => {
    const updatedPhotos = [...values.turfPhotos];
    updatedPhotos.splice(index, 1);
    setFieldValue("turfPhotos", updatedPhotos);
    URL.revokeObjectURL(photoPreview[index].preview);
    setPhotoPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const addAmenity = (
    setFieldValue: (field: string, value: any) => void,
    values: TurfFormValues
  ): void => {
    if (
      amenityInput.trim() &&
      !values.aminities.includes(amenityInput.trim())
    ) {
      setFieldValue("aminities", [...values.aminities, amenityInput.trim()]);
      setAmenityInput("");
    }
  };

  const removeAmenity = (
    index: number,
    setFieldValue: (field: string, value: any) => void,
    values: TurfFormValues
  ): void => {
    const updatedAminities = [...values.aminities];
    updatedAminities.splice(index, 1);
    setFieldValue("aminities", updatedAminities);
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <Formik<TurfFormValues>
        initialValues={{
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          courtSize: "",
          isBlocked: false,
          aminities: [],
          turfPhotos: [],
          turfPhotoUrls: [],
        }}
        validationSchema={turfvalidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Form values", values);
          onSubmit(values, { setSubmitting });
        }}
      >
        {({ values, touched,setFieldValue, isSubmitting }) => (
          <Form className="space-y-6 bg-black">
            <div className="mb-10">
              <h2 className="text-xl font-semibold pb-2 mb-6 border-b-2 border-green-500 text-green-500">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Turf Name*
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-3 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-green-500"
                    placeholder="Enter turf name"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email Address*
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-3 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-green-500"
                    placeholder="example@email.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-2 font-medium">
                    Phone Number*
                  </label>
                  <Field
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full p-3 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-green-500"
                    placeholder="Enter phone number"
                  />
                  <ErrorMessage
                    name="phone"
                    component="p"
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="courtSize" className="block mb-2 font-medium">
                    Court Size*
                  </label>
                  <Field
                    type="text"
                    id="courtSize"
                    name="courtSize"
                    className="w-full p-3 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-green-500"
                    placeholder="e.g., 40x20 meters"
                  />
                  <ErrorMessage
                    name="courtSize"
                    component="p"
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2 font-medium">
                    Password*
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="w-full p-3 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-green-500"
                    placeholder="Create a password"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 font-medium"
                  >
                    Confirm Password*
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full p-3 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-green-500"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold pb-2 mb-6 border-b-2 border-green-500 text-green-500">
                Turf Photos
              </h2>

              <div className="mb-6">
                <label className="block mb-2 font-medium">
                  Upload Photos of Your Turf*
                </label>
                <div
                  className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors bg-black"
                  onClick={() =>
                    document.getElementById("photo-upload")?.click()
                  }
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-12 h-12 text-green-500 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <p className="mb-2 text-lg">
                      Drag and drop photos or click to browse
                    </p>
                    <p className="text-gray-500 text-sm">
                      JPG, PNG or WEBP (max. 5MB each)
                    </p>
                  </div>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, setFieldValue, values)}
                    className="hidden"
                  />
                </div>
                {values.turfPhotos.length === 0 && touched.turfPhotos && (
                  <p className="mt-1 text-red-500 text-sm">
                    At least one photo is required
                  </p>
                )}
              </div>

              {photoPreview.length > 0 && (
                <div>
                  <label className="block mb-2 font-medium">
                    Uploaded Photos
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photoPreview.map((item, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={item.preview}
                          alt={`Turf photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removePhoto(index, setFieldValue, values)
                          }
                          className="absolute top-2 right-2 bg-black bg-opacity-70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Aminities */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold pb-2 mb-6 border-b-2 border-green-500 text-green-500">
                Aminities
              </h2>

              <div className="mb-6">
                <label className="block mb-2 font-medium">
                  Add Aminities Your Turf Offers
                </label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                    className="flex-1 p-3 bg-black border border-gray-700 rounded-l-md focus:outline-none focus:border-green-500"
                    placeholder="e.g., Changing rooms, Floodlights"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addAmenity(setFieldValue, values))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => addAmenity(setFieldValue, values)}
                    className="px-4 bg-green-600 text-white rounded-r-md hover:bg-green-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <p className="text-gray-500 text-sm">
                  Press Enter or click Add to include an amenity
                </p>
              </div>

              {values.aminities.length > 0 && (
                <div>
                  <label className="block mb-2 font-medium">
                    Added Aminities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {values.aminities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-green-900 bg-opacity-40 text-green-400 rounded-full px-3 py-1"
                      >
                        <span>{amenity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            removeAmenity(index, setFieldValue, values)
                          }
                          className="ml-2 focus:outline-none"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:bg-green-800 disabled:opacity-70"
              >
                {isSubmitting ? "Registering..." : "Register Turf"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TurfRegisterForm;
