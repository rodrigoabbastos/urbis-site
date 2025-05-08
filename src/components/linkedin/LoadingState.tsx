
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingState = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <Card key={`loading-${i}`} className="overflow-hidden h-full">
          <CardHeader className="pb-0">
            <Skeleton className="h-4 w-32 mb-2" />
          </CardHeader>
          <CardContent className="py-4">
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-32" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default LoadingState;
