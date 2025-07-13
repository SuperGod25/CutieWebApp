import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // adjust if your path differs
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Coffee, Flower, Gift, Star } from 'lucide-react';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReserveForm, setShowReserveForm] = useState(false);
  const [reserveFormData, setReserveFormData] = useState({
    name: '',
    date: '',
    flowerSelection: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('category', { ascending: true });

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const categorizedProducts = {
    coffee: products.filter((p) => p.category === 'coffee'),
    flowers: products.filter((p) => p.category === 'flowers'),
    bundle: products.filter((p) => p.category === 'bundle')
  };

  const handleReserveFlowers = (e) => {
    e.preventDefault();
    alert('Mulțumim! Te vom contacta pentru a confirma rezervarea florilor tale.');
    setShowReserveForm(false);
    setReserveFormData({ name: '', date: '', flowerSelection: '' });
  };

  const ProductCard = ({ item, showReserveButton = false }) => (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <div className="aspect-video overflow-hidden rounded-t-lg">
        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <span className="text-lg font-bold text-primary">{item.price} RON</span>
        </div>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      {showReserveButton && (
        <CardContent>
          <Button onClick={() => setShowReserveForm(true)} className="w-full" variant="outline">
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

        {loading ? (
          <p className="text-center text-muted-foreground">Se încarcă produsele...</p>
        ) : (
          <>
            {/* Coffee */}
            <section className="mb-16">
              <div className="flex items-center space-x-3 mb-8">
                <Coffee className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold">Cafea și băuturi</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categorizedProducts.coffee.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </section>

            {/* Flowers */}
            <section className="mb-16">
              <div className="flex items-center space-x-3 mb-8">
                <Flower className="h-8 w-8 text-purple-600" />
                <h2 className="text-3xl font-bold">Flori proaspete</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categorizedProducts.flowers.map((item) => (
                  <ProductCard key={item.id} item={item} showReserveButton={true} />
                ))}
              </div>
            </section>

            {/* Bundles */}
            <section className="mb-16">
              <div className="flex items-center space-x-3 mb-8">
                <Gift className="h-8 w-8 text-green-600" />
                <h2 className="text-3xl font-bold">Pachete cadou</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorizedProducts.bundle.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          </>
        )}

        {/* Reserve Modal */}
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
                  <Input
                    type="text"
                    placeholder="Nume"
                    value={reserveFormData.name}
                    onChange={(e) => setReserveFormData({ ...reserveFormData, name: e.target.value })}
                    required
                  />
                  <Input
                    type="date"
                    value={reserveFormData.date}
                    onChange={(e) => setReserveFormData({ ...reserveFormData, date: e.target.value })}
                    required
                  />
                  <Select
                    value={reserveFormData.flowerSelection}
                    onValueChange={(value) =>
                      setReserveFormData({ ...reserveFormData, flowerSelection: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Alege aranjamentul" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorizedProducts.flowers.map((f) => (
                        <SelectItem key={f.id} value={f.name}>
                          {f.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex space-x-2 pt-4">
                    <Button type="submit" className="flex-1">
                      Rezervă
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowReserveForm(false)}>
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
