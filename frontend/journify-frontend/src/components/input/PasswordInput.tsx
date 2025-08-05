import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function PasswordInput({
  value,
  onChange,
  placeholder,
}: PasswordInputProps) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-violet-600/5 px-5 rounded mb-3">
      <input
        value={value}
        placeholder={placeholder || "Password"}
        type={isShowPassword ? "text" : "password"}
        className="w-full text-sm bg-transparent py-3 mr-4 rounded outline-none"
        onChange={onChange}
      />

      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-primary cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-primary cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      )}
    </div>
  );
}
