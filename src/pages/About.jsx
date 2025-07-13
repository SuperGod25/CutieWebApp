import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Leaf, Target, Award, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Despre cutie</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            O florărie, o cafenea și o întreprindere socială — un spațiu care promovează incluziunea, sustenabilitatea și comunitatea.
          </p>
        </div>

        {/* Povestea */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Povestea cutie</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Proiectul <strong>cutie</strong> a pornit în 2025 din dorința de a crea un spațiu cald și primitor, unde cafeaua de specialitate și florile locale se împletesc cu valori sociale profunde.
                </p>
                <p>
                  Nu suntem doar o cafenea sau o florărie — suntem o întreprindere socială care creează oportunități pentru persoanele din grupuri vulnerabile, promovează colaborările locale și pune sustenabilitatea pe primul loc.
                </p>
                <p>
                  Fiecare cafea servită susține un fermier echitabil. Fiecare buchet aranjat sprijină un producător local. Fiecare eveniment găzduit creează legături reale între oameni.
                </p>
                <p>
                  La cutie, credem că impactul social pornește de la gesturi mici, dar constante. Împreună, construim o comunitate mai empatică, mai conștientă și mai conectată.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop" alt="Interior cafenea" className="rounded-lg shadow-lg" />
              <img src="https://images.unsplash.com/photo-1481833761820-0509d3217039?w=300&h=200&fit=crop" alt="Flori locale" className="rounded-lg shadow-lg mt-8" />
              <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300&h=200&fit=crop" alt="Eveniment comunitar" className="rounded-lg shadow-lg -mt-8" />
              <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=200&fit=crop" alt="Cafea preparată" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </section>

        {/* Misiune & Viziune */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Target className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">Misiunea noastră</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Să oferim un spațiu incluziv și sigur unde fiecare persoană este văzută, ascultată și apreciată. Promovăm conexiunile autentice prin cafea, flori și evenimente comunitare.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">Viziunea noastră</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ne imaginăm un oraș în care fiecare colț este o oportunitate de conectare, unde incluziunea este standardul, iar sustenabilitatea o practică firească.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Valori */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Valorile noastre</h2>
            <p className="text-muted-foreground">
              Tot ce facem este ghidat de aceste trei principii:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Incluziune</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Oricine este binevenit la cutie — indiferent de vârstă, gen, etnie, dizabilitate sau statut social. Ne angajăm să construim un spațiu sigur și deschis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Sustenabilitate</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Folosim ambalaje biodegradabile, colaborăm cu producători locali și reducem risipa în fiecare etapă a activității noastre.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Comunitate</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Organizăm evenimente, ateliere și parteneriate care creează punți între oameni și idei. La cutie, comunitatea este esențială.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Fă parte din povestea noastră</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Te așteptăm cu drag la o cafea, un buchet și o conversație. Împreună putem construi o comunitate mai caldă și mai atentă.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/events">Vezi Evenimentele</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contactează-ne</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
