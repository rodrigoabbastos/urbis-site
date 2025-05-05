
import { useState } from 'react';
import PropertyCard from '@/components/ui/PropertyCard';
import { Button } from '@/components/ui/button';

const Properties = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'sale' | 'rent'>('all');
  
  const properties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=992&q=80",
      title: "Apartamento de Luxo",
      price: "R$ 890.000",
      location: "Vila Nova Conceição, São Paulo",
      bedrooms: 3,
      bathrooms: 2,
      area: "120m²",
      type: "sale" as const,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      title: "Casa com Jardim",
      price: "R$ 1.250.000",
      location: "Alphaville, Barueri",
      bedrooms: 4,
      bathrooms: 3,
      area: "280m²",
      type: "sale" as const,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Cobertura Duplex",
      price: "R$ 5.900/mês",
      location: "Jardins, São Paulo",
      bedrooms: 2,
      bathrooms: 2,
      area: "150m²",
      type: "rent" as const,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Casa em Condomínio",
      price: "R$ 8.500/mês",
      location: "Granja Viana, Cotia",
      bedrooms: 3,
      bathrooms: 4,
      area: "200m²",
      type: "rent" as const,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80",
      title: "Loft Moderno",
      price: "R$ 650.000",
      location: "Pinheiros, São Paulo",
      bedrooms: 1,
      bathrooms: 1,
      area: "75m²",
      type: "sale" as const,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Sala Comercial",
      price: "R$ 3.200/mês",
      location: "Itaim Bibi, São Paulo",
      bedrooms: 0,
      bathrooms: 1,
      area: "45m²",
      type: "rent" as const,
    },
  ];

  const filteredProperties = activeFilter === 'all' 
    ? properties 
    : properties.filter(property => property.type === activeFilter);

  return (
    <section id="properties" className="section-padding bg-white">
      <div className="container-wrapper">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-urbis-navy mb-4">
            Imóveis em Destaque
          </h2>
          <p className="text-urbis-darkGray max-w-3xl mx-auto">
            Conheça nossos imóveis selecionados que atendem aos mais altos padrões de qualidade e conforto.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-urbis-lightGray rounded-lg p-1">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === 'all' 
                  ? 'bg-white text-urbis-navy shadow-sm' 
                  : 'text-urbis-darkGray hover:text-urbis-navy'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveFilter('sale')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === 'sale' 
                  ? 'bg-white text-urbis-navy shadow-sm' 
                  : 'text-urbis-darkGray hover:text-urbis-navy'
              }`}
            >
              À Venda
            </button>
            <button
              onClick={() => setActiveFilter('rent')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === 'rent' 
                  ? 'bg-white text-urbis-navy shadow-sm' 
                  : 'text-urbis-darkGray hover:text-urbis-navy'
              }`}
            >
              Para Alugar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard 
              key={property.id}
              image={property.image}
              title={property.title}
              price={property.price}
              location={property.location}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={property.area}
              type={property.type}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-urbis-navy text-urbis-navy hover:bg-urbis-navy hover:text-white">
            <a href="#contact">Ver Todos os Imóveis</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Properties;
