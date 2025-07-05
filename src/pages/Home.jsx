import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Coffee, Heart, Users, Leaf, Calendar, MapPin } from 'lucide-react';
import CutieLogo from '@/components/ui/logo';
import { newsletterAPI } from '@/lib/api';

const Home = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);

    try {
      const result = await newsletterAPI.subscribe(email);
      
      if (result.success) {
        alert('Mulțumim că te-ai abonat la newsletter-ul nostru!');
        setEmail('');
      } else {
        alert(result.error || 'A apărut o eroare la abonare. Te rugăm să încerci din nou.');
      }
    } catch (error) {
      console.error('Eroare la abonarea la newsletter:', error);
      alert('A apărut o eroare la abonare. Te rugăm să încerci din nou.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const coreValues = [
    {
      icon: <Users className="h-8 w-8 text-violet-500" />,
      title: "Incluziune",
      description: "Credem că fiecare merită un loc la masă. Spațiul nostru îi primește pe toți, indiferent de origine, abilități sau comunitate."
    },
    {
      icon: <Leaf className="h-8 w-8 text-mint-500" />,
      title: "Sustenabilitate",
      description: "De la cafeaua de origine locală la ambalajele eco-friendly, suntem dedicați protejării planetei noastre."
    },
    {
      icon: <Heart className="h-8 w-8 text-purple-500" />,
      title: "Comunitate",
      description: "Mai mult decât o cafenea, suntem un centru pentru conexiune, creativitate și impact social pozitiv."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-violet-50 via-purple-50 to-mint-50 py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center mb-6">
            <CutieLogo className="h-24 w-24" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-purple-700 mb-4">
            cutie
          </h1>
          <h2 className="text-lg md:text-xl text-violet-600 font-medium mb-6 max-w-4xl mx-auto">
            florărie, cafenea și comunitate: un spațiu pentru incluziune, creativitate și conexiune
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Unde cafeaua întâlnește comunitatea în inima Cluj-Napocii. O întreprindere socială dedicată construirii de punți între oameni prin experiențe autentice și sustenabile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-violet-500 hover:bg-violet-600">
              <Link to="/menu">Explorează Meniul</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-violet-300 text-violet-700 hover:bg-violet-50">
              <Link to="/reservations">Fă o Rezervare</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Misiunea și Valorile Noastre</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Construim un spațiu comunitar care creează impact social pozitiv prin fiecare ceașcă de cafea și fiecare aranjament floral în Cluj-Napoca.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="text-center border-violet-100 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-violet-700">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-violet-50/50 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Ce Oferim</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow border-violet-100">
              <CardHeader>
                <Coffee className="h-8 w-8 text-violet-500 mb-2" />
                <CardTitle className="text-lg text-violet-700">Cafea & Meniu</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Cafea artizanală, flori proaspete și pachete cadou atent curate.
                </CardDescription>
                <Button asChild variant="outline" className="w-full border-violet-300 text-violet-700 hover:bg-violet-50">
                  <Link to="/menu">Vezi Meniul</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-violet-100">
              <CardHeader>
                <Calendar className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle className="text-lg text-purple-700">Servicii</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Fotografii instant, închiriere spațiu pentru evenimente și pachete team building.
                </CardDescription>
                <Button asChild variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                  <Link to="/services">Află Mai Mult</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-violet-100">
              <CardHeader>
                <Users className="h-8 w-8 text-mint-500 mb-2" />
                <CardTitle className="text-lg text-mint-700">Evenimente</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Evenimente comunitare, workshop-uri și întâlniri care aduc oamenii împreună.
                </CardDescription>
                <Button asChild variant="outline" className="w-full border-mint-300 text-mint-700 hover:bg-mint-50">
                  <Link to="/events">Vezi Evenimente</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-violet-100">
              <CardHeader>
                <MapPin className="h-8 w-8 text-violet-500 mb-2" />
                <CardTitle className="text-lg text-violet-700">Rezervări</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Rezervă o masă, comandă flori sau închiriază spațiul nostru pentru evenimentul tău special.
                </CardDescription>
                <Button asChild className="w-full bg-violet-500 hover:bg-violet-600">
                  <Link to="/reservations">Rezervă Acum</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-violet-700">Vizitează-ne în Cluj-Napoca</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-violet-500 mt-1" />
                  <div>
                    <p className="font-medium">Strada Comunității 123</p>
                    <p className="text-muted-foreground">Centrul Vechi, Cluj-Napoca 400001</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p><span className="font-medium">Telefon:</span> +40 264 123 456</p>
                  <p><span className="font-medium">Email:</span> salut@cutie.ro</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Program:</p>
                  <p className="text-muted-foreground">Luni - Vineri: 07:00 - 20:00</p>
                  <p className="text-muted-foreground">Sâmbătă - Duminică: 08:00 - 21:00</p>
                </div>
              </div>
            </div>
            <div className="bg-violet-50 rounded-lg h-64 flex items-center justify-center border border-violet-200">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-violet-400 mx-auto mb-4" />
                <p className="text-violet-600">Integrare Google Maps</p>
                <p className="text-sm text-violet-500 mt-2">Cluj-Napoca, România</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-violet-100 to-purple-100 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-violet-700">Rămâi Conectat</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Abonează-te la newsletter-ul nostru pentru actualizări despre produse noi, evenimente viitoare și inițiative comunitare din Cluj-Napoca.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Introdu adresa ta de email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 border-violet-200 focus:border-violet-400"
              />
              <Button 
                type="submit" 
                className="bg-violet-500 hover:bg-violet-600"
                disabled={isSubscribing}
              >
                {isSubscribing ? 'Se procesează...' : 'Abonează-te'}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
