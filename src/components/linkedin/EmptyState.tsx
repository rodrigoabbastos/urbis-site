
import React from 'react';
import { Button } from "@/components/ui/button";

const EmptyState = () => {
  return (
    <div className="text-center py-16 px-4 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Em breve novidades do nosso LinkedIn aqui.</h3>
      <p className="text-gray-600">
        Enquanto isso, visite nossa página no LinkedIn para acompanhar nossas atualizações.
      </p>
      <Button asChild className="mt-4 bg-[#0A66C2] hover:bg-[#0A66C2]/90">
        <a href="https://www.linkedin.com/company/urbis-inteligencia" target="_blank" rel="noopener noreferrer">
          Visitar LinkedIn
        </a>
      </Button>
    </div>
  );
};

export default EmptyState;
