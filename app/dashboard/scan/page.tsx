//'use client';

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { lusitana } from "@/app/ui/fonts";
import { CardSkeleton } from "@/app/ui/skeletons";
import QRScan from "@/app/ui/scanner/QRScan";
// const QRScan = dynamic(
//   () => import("../../ui/scanner/QRScan"),
//   { ssr: false, }
// );
import Temp from "@/app/ui/scanner/Temp";


export default async function Page() {

    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <QRScan facingMode="front"/>
          {/* <Temp/> */}
        </div>
      </div>
    );
  }