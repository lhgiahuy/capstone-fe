"use client";

import Image from "next/image";
import { useState } from "react";
import { Input } from "./input";
import { toBase64 } from "@/lib/utils";

type FileInputType = {
  value?: File;
  onChange?: (value?: File) => void;
  subtitle?: string;
  placeholderImage?: string;
};

export default function ImageInput({
  onChange,
  subtitle,
  placeholderImage,
}: FileInputType) {
  const [image, setImage] = useState(
    placeholderImage ? placeholderImage : "/images/image-placeholder.jpg"
  );
  // const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = (await toBase64(file)) as string;
      setImage(base64);
      onChange?.(file);
    }
  };
  return (
    <div className="flex justify-between w-full flex-wrap gap-4 items-center justify-center">
      <div className="relative w-full h-[16rem]">
        <Image
          src={image}
          alt="avatar image"
          fill
          className="w-full h-full top-0 left-0 object-contain"
        />
      </div>
      <div className="space-y-2 flex flex-col w-full items-center">
        <div className="text-gray-500 text-xs">
          {subtitle ? subtitle : "We support PNGs, JPEGs under 10MB"}
        </div>
        <div>
          <Input type="file" onChange={handleChange} accept="image/*" />
        </div>
      </div>
    </div>
  );
}
