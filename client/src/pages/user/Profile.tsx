import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { User, ArrowLeft, Edit } from "lucide-react";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { profileSchema } from "../../utils/validations/profileValidator";
import { uploadProfileImageCloudinary } from "../../utils/cloudinaryImageUpload";
import { updateProfilePayload, updateUserProfile } from "../../store/slices/user.slice";
import { AppDispatch } from "../../store/store";


const Profile = () => {
    const user = useSelector((state:any)=>state.user.user);
    console.log("user in profile ",user)
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [showPositionSelector, setShowPositionSelector] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null);
    const [selectedPosition, setSelectedPosition] = useState(user?.position || "Not specified");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [customPosition, setCustomPosition] = useState<{x: number, y: number} | null>(null);
    const dispatch = useDispatch<AppDispatch>()
  // User profile data
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    position:user?.position
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 5MB.");
      return;
    }

    if (!file.type.match('image/*')) {
      toast.error("Only image files are allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    setSelectedImage(file);

  };
  // Handle position selection on the field
  const handleFieldClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setCustomPosition({ x, y });
    setSelectedPosition("Custom");
  };
  const saveChanges = async () => {
    const updatedData={
        name:formData.name.trim(),
        phone:formData.phone.trim() || null,
        position:selectedPosition == "Custom"?customPosition:selectedPosition
    };
    console.log(updatedData)
    try {
        await profileSchema.validate(updatedData,{abortEarly:false});
        let imageUrl = profileImage || "";
        if(selectedImage){
            const response = await uploadProfileImageCloudinary(selectedImage);
            console.log("cloud img",response)
            if(response){
                imageUrl = response
            }
        }

        const profileData:updateProfilePayload = {
            name:updatedData.name,
            phone:updatedData.phone || '',
            position:updatedData.position || '',
            profileImage:imageUrl,
        }

        await dispatch(updateUserProfile(profileData));
        toast.success("User detials updated Successfully")

    } catch (error:any) {
        if (error instanceof Yup.ValidationError) {
            const validationErrors: Record<string, string> = {};
            error.inner.forEach((err:any) => {
            validationErrors[err.path] = err.message;
            });
            toast.error("Please correct the validation errors");
        } else {
            toast.error(`Failed updating user profile: ${error.message || 'Unknown error'}`);
        }
    }
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Back button */}
        <button 
          onClick={() => navigate("/")} 
          className="flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </button>

        <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-32 bg-green-600">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-gray-800">
                  {profileImage ? (
                    <AvatarImage src={profileImage} />
                  ) : (
                    <AvatarFallback className="bg-gray-700 text-gray-300 text-xl">
                      <User size={32} />
                    </AvatarFallback>
                  )}
                </Avatar>
                {editMode && (
                  <label 
                    htmlFor="profile-picture" 
                    className="absolute bottom-0 right-0 bg-gray-900 p-1 rounded-full cursor-pointer hover:bg-gray-700"
                  >
                    <Edit size={16} />
                    <input 
                      type="file" 
                      id="profile-picture" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>
            {!editMode && (
              <button 
                onClick={() => setEditMode(true)}
                className="absolute top-4 right-4 bg-gray-700 p-2 rounded-full hover:bg-gray-600"
              >
                <Edit size={16} />
              </button>
            )}
          </div>

          {/* Profile Content */}
          <div className="pt-16 px-6 pb-6">
            <h1 className="text-2xl font-bold text-center mb-6">{formData.name}</h1>
            
            {editMode ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="position">Playing Position</Label>
                    <div className="flex space-x-2">
                      <Select 
                        value={selectedPosition} 
                        onValueChange={setSelectedPosition}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600">
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                          <SelectItem value="Defender">Defender</SelectItem>
                          <SelectItem value="Midfielder">Midfielder</SelectItem>
                          <SelectItem value="Forward">Forward</SelectItem>
                          <SelectItem value="Custom">Custom</SelectItem>
                          <SelectItem value="Not specified">Not specified</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {selectedPosition !== "Not specified" && (
                        <Button 
                          variant="outline" 
                          onClick={() => setShowPositionSelector(true)}
                          className="whitespace-nowrap"
                        >
                          Select on Field
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button 
                    onClick={saveChanges}
                    className="flex-1 bg-green-600 hover:bg-green-500"
                  >
                    Save Changes
                  </Button>
                  <Button 
                    onClick={() => setEditMode(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-700">
                    <span className="text-gray-400">Email</span>
                    <span>{formData.email}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-700">
                    <span className="text-gray-400">Phone</span>
                    <span>{formData.phone}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-700">
                    <span className="text-gray-400">Playing Position</span>
                    <span>{selectedPosition}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Position selector dialog */}
        <Dialog open={showPositionSelector} onOpenChange={setShowPositionSelector}>
          <DialogContent className="sm:max-w-md bg-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Select Your Position</DialogTitle>
            </DialogHeader>
            <div className="relative w-full aspect-[4/3] bg-green-800 rounded-lg overflow-hidden">
              {/* Football field */}
              <div 
                className="w-full h-full bg-green-700 relative"
                onClick={handleFieldClick}
              >
                {/* Field markings */}
                <div className="absolute inset-0 flex flex-col">
                  {/* Center line */}
                  <div className="w-full h-px bg-white mt-1/2"></div>
                  {/* Center circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white"></div>
                  {/* Goal areas */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 border-b border-l border-r border-white"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-6 border-t border-l border-r border-white"></div>
                </div>

                {/* Predefined positions */}
                <RadioGroup 
                  value={selectedPosition} 
                  onValueChange={setSelectedPosition} 
                  className="absolute inset-0"
                >
                  {/* Goalkeeper */}
                  <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2">
                    <RadioGroupItem value="Goalkeeper" id="goalkeeper" className="peer sr-only" />
                    <Label 
                      htmlFor="goalkeeper" 
                      className="flex flex-col items-center cursor-pointer p-1 rounded-full peer-data-[state=checked]:bg-white peer-data-[state=checked]:text-green-800"
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                      <span className="text-xs mt-1">GK</span>
                    </Label>
                  </div>
                  
                  {/* Defenders */}
                  <div className="absolute top-[25%] left-1/2 transform -translate-x-1/2">
                    <RadioGroupItem value="Defender" id="defender" className="peer sr-only" />
                    <Label 
                      htmlFor="defender" 
                      className="flex flex-col items-center cursor-pointer p-1 rounded-full peer-data-[state=checked]:bg-white peer-data-[state=checked]:text-green-800"
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                      <span className="text-xs mt-1">DEF</span>
                    </Label>
                  </div>
                  
                  {/* Midfielders */}
                  <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <RadioGroupItem value="Midfielder" id="midfielder" className="peer sr-only" />
                    <Label 
                      htmlFor="midfielder" 
                      className="flex flex-col items-center cursor-pointer p-1 rounded-full peer-data-[state=checked]:bg-white peer-data-[state=checked]:text-green-800"
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                      <span className="text-xs mt-1">MID</span>
                    </Label>
                  </div>
                  
                  {/* Forwards */}
                  <div className="absolute top-[75%] left-1/2 transform -translate-x-1/2">
                    <RadioGroupItem value="Forward" id="forward" className="peer sr-only" />
                    <Label 
                      htmlFor="forward" 
                      className="flex flex-col items-center cursor-pointer p-1 rounded-full peer-data-[state=checked]:bg-white peer-data-[state=checked]:text-green-800"
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                      <span className="text-xs mt-1">FWD</span>
                    </Label>
                  </div>
                </RadioGroup>

                {/* Custom position marker */}
                {customPosition && (
                  <div 
                    className="absolute w-4 h-4 bg-yellow-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white"
                    style={{ left: `${customPosition.x}%`, top: `${customPosition.y}%` }}
                  ></div>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={() => setShowPositionSelector(false)}
                className="bg-green-600 hover:bg-green-500"
              >
                Confirm Position
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
