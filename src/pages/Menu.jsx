import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Coffee, Flower, Gift, Star } from 'lucide-react';

const Menu = () => {
  const [showReserveForm, setShowReserveForm] = useState(false);
  const [reserveFormData, setReserveFormData] = useState({
    name: '',
    date: '',
    flowerSelection: ''
  });

  const coffeeItems = [
    {
      name: "Amestec Signature cutie",
      description: "Amestecul nostru de casă care susține fermierii locali",
      price: "18 RON",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=200&fit=crop"
    },
    {
      name: "Cappuccino Comunitar",
      description: "Espresso din surse etice cu lapte organic",
      price: "20 RON",
      image: "https://images.unsplash.com/photo-1573441287717-4b8b3cf28e9d?w=300&h=200&fit=crop"
    },
    {
      name: "Cold Brew Sustenabil",
      description: "Cold brew fin în sticle de sticlă reutilizabile",
      price: "16 RON",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&h=200&fit=crop"
    },
    {
      name: "Latte Incluziune",
      description: "Latte cu lapte de ovăz și arome sezoniere opționale",
      price: "22 RON",
      image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=300&h=200&fit=crop"
    }
  ];

  const flowerArrangements = [
    {
      name: "Buchet Comunitar",
      description: "Flori mixte de sezon de la cultivatori locali",
      price: "100 RON",
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=200&fit=crop"
    },
    {
      name: "Centru de masă Sustenabil",
      description: "Aranjament eco-friendly în vază reutilizabilă",
      price: "140 RON",
      image: "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=300&h=200&fit=crop"
    },
    {
      name: "Trandafiri Incluziune",
      description: "Trandafiri curcubeu care celebrează diversitatea",
      price: "120 RON",
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&h=200&fit=crop"
    },
    {
      name: "Abonament lunar",
      description: "Flori proaspete livrate săptămânal",
      price: "320 RON/lună",
      image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=300&h=200&fit=crop"
    }
  ];

  const giftBundles = [
    {
      name: "Pachet Cafea + Flori",
      description: "Combinația perfectă dintre amestecul nostru signature și buchetul de sezon",
      price: "112 RON",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop"
    },
    {
      name: "Pachet Îngrijire Comunitar",
      description: "Cafea, flori și delicatese locale",
      price: "180 RON",
      image: "https://images.unsplash.com/photo-1549298240-0d0997090716?w=300&h=200&fit=crop"
    },
    {
      name: "Kit Sustenabilitate",
      description: "Cană reutilizabilă, boabe de cafea și plantă în ghiveci",
      price: "140 RON",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop"
    }
  ];

  const handleReserveFlowers = (e) => {
    e.preventDefault();
    alert('Mulțumim! Te vom contacta pentru a confirma rezervarea florilor tale.');
    setShowReserveForm(false);
    setReserveFormData({ name: '', date: '', flowerSelection: '' });
  };

  const ProductCard = ({ item, showReserveButton = false }) => (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <div className="aspect-video overflow-hidden rounded-t-lg">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <span className="text-lg font-bold text-primary">{item.price}</span>
        </div>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      {showReserveButton && (
        <CardContent>
          <Button 
            onClick={() => setShowReserveForm(true)}
            className="w-full"
            variant="outline"
          >
            Rezervă flori
          </Button>
        </CardContent>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Meniul nostru</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descoperă selecția noastră atent curată de cafea din surse etice, flori cultivate local și pachete cadou gândite cu grijă.
          </p>
        </div>

        {/* Coffee Section */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <Coffee className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Cafea și băuturi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coffeeItems.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>
        </section>

        {/* Flowers Section */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <Flower className="h-8 w-8 text-purple-600" />
            <h2 className="text-3xl font-bold">Flori proaspete</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flowerArrangements.map((item, index) => (
              <ProductCard key={index} item={item} showReserveButton={true} />
            ))}
          </div>
        </section>

        {/* Gift Bundles Section */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <Gift className="h-8 w-8 text-green-600" />
            <h2 className="text-3xl font-bold">Pachete cadou</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {giftBundles.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>
        </section>

        {/* Special Features */}
        <section className="bg-muted/30 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">De ce să alegi cutie?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <Star className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Surse etice</h4>
              <p className="text-sm text-muted-foreground">Toate produsele noastre susțin comerțul echitabil și comunitățile locale.</p>
            </div>
            <div>
              <Star className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Practici sustenabile</h4>
              <p className="text-sm text-muted-foreground">Ambalaje eco-friendly și inițiative zero waste.</p>
            </div>
            <div>
              <Star className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Impact comunitar</h4>
              <p className="text-sm text-muted-foreground">Fiecare achiziție susține misiunea noastră de întreprindere socială.</p>
            </div>
          </div>
        </section>

        {/* Reserve Flowers Modal Overlay */}
        {showReserveForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Rezervă flori</CardTitle>
                <CardDescription>
                  Spune-ne preferințele tale și vom pregăti aranjamentul perfect pentru tine.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReserveFlowers} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Nume</label>
                    <Input
                      type="text"
                      value={reserveFormData.name}
                      onChange={(e) => setReserveFormData({...reserveFormData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Data preferată</label>
                    <Input
                      type="date"
                      value={reserveFormData.date}
                      onChange={(e) => setReserveFormData({...reserveFormData, date: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Selecția de flori</label>
                    <Select 
                      value={reserveFormData.flowerSelection}
                      onValueChange={(value) => setReserveFormData({...reserveFormData, flowerSelection: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Alege aranjamentul" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="community">Buchet Comunitar</SelectItem>
                        <SelectItem value="centerpiece">Centru de masă Sustenabil</SelectItem>
                        <SelectItem value="roses">Trandafiri Incluziune</SelectItem>
                        <SelectItem value="subscription">Abonament lunar</SelectItem>
                        <SelectItem value="custom">Aranjament personalizat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Button type="submit" className="flex-1">Rezervă</Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowReserveForm(false)}
                    >
                      Anulează
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
