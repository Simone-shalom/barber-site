import React from "react";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const CardSkeleton = () => {
  return (
    <div className="col-span-1 cursor-pointer">
      <Card className="flex flex-col gap-2 w-full rounded-b-lg pb-2">
        <Skeleton />
      </Card>
    </div>
  );
};
