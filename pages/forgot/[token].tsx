import Image from "next/image";

import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import Logo from "@/components/layout/logo/Logo";
import { images } from "@/constants";

export default function ChangePassword() {
  return (
    <div>
      <div className="absolute -z-10 h-screen w-screen">
        <Image
          src={images.loginBackground}
          alt="Login Background"
          width={0}
          height={0}
          sizes="100vw"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="no-scrollbar relative h-screen z-1 overflow-y-scroll overflow-x-hidden px-4 py-8 lg:px-0">
        <div className="w-full flex flex-col items-center gap-16 lg:gap-32 ">
          <div className="w-3/4 lg:w-1/3 lg:flex lg:justify-center">
            <Logo width={674} height={301} />
          </div>
          <div className="w-full lg:w-1/2">
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
