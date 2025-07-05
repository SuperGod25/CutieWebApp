import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Users, Camera, Heart } from 'lucide-react';
import { eventAPI } from '@/lib/api';
import { supabase } from '@/lib/supabase';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Eroare la încărcarea evenimentelor:', error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingEvents = events.filter(event => new Date(event.event_date) >= new Date());

  const pastEvents = [
    {
      title: "Celebrarea deschiderii",
      date: "Ianuarie 2024",
      description: "Comunitatea noastră s-a unit pentru a celebra deschiderea cutie",
      images: [
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=300&h=200&fit=crop"
      ]
    },
    {
      title: "Workshop flori de sărbători",
      date: "Decembrie 2023",
      description: "Crearea de aranjamente festive pentru sezonul sărbătorilor",
      images: [
        "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=300&h=200&fit=crop"
      ]
    }
  ];

  const handleSignUp = async (event) => {
    const name = prompt('Introdu numele tău:');
    const email = prompt('Introdu adresa de email:');
    
    if (name && email) {
      try {
        const result = await eventAPI.registerForEvent(event.id, {
          name,
          email,
          eventTitle: event.title
        });
        
        if (result.success) {
          alert(`Te-ai înregistrat cu succes la evenimentul "${event.title}"! Vei primi un email de confirmare.`);
        } else {
          alert('A apărut o eroare la înregistrare. Te rugăm să încerci din nou.');
        }
      } catch (error) {
        console.error('Eroare la înregistrarea la eveniment:', error);
        alert('A apărut o eroare la înregistrare. Te rugăm să încerci din nou.');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatPrice = (price) => {
    return price === 0 ? 'Gratuit' : `${price} RON`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Workshop': 'bg-blue-100 text-blue-800',
      'Creative': 'bg-purple-100 text-purple-800',
      'Community': 'bg-green-100 text-green-800',
      'Arts': 'bg-pink-100 text-pink-800',
      'Networking': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 flex items-center justify-center">
        <p>Se încarcă evenimentele...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Evenimente comunitare</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Alătură-te pentru workshop-uri, evenimente de networking și întâlniri comunitare care aduc oamenii împreună în jurul valorilor noastre comune.
          </p>
        </div>

        {/* Upcoming Events */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <Calendar className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Evenimente viitoare</h2>
          </div>
          
          {upcomingEvents.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nu sunt evenimente programate momentan</h3>
                <p className="text-muted-foreground">Urmărește-ne pe rețelele sociale pentru anunțuri despre evenimente viitoare!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="h-full hover:shadow-lg transition-shadow">
                  {event.image_url && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                      <span className="text-sm font-semibold text-primary">{formatPrice(event.price)}</span>
                    </div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.event_date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.event_time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>Capacitate: {event.capacity} persoane</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleSignUp(event)}
                      className="w-full"
                    >
                      Înscrie-te
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Past Events Gallery */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <Camera className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Galeria evenimentelor trecute</h2>
          </div>
          
          <div className="space-y-8">
            {pastEvents.map((event, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>{event.date}</CardDescription>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{event.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {event.images.map((image, imgIndex) => (
                      <div key={imgIndex} className="aspect-video overflow-hidden rounded-lg">
                        <img 
                          src={image} 
                          alt={`${event.title} fotografie ${imgIndex + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Event Information */}
        <section className="bg-muted/30 rounded-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Informații evenimente</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Toate evenimentele sunt concepute să fie incluzive și accesibile. Îi primim pe oameni din toate mediile și cu toate abilitățile.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Mediu incluziv</h4>
              <p className="text-sm text-muted-foreground">
                Toate evenimentele sunt concepute să fie primitoare și accesibile pentru toată lumea
              </p>
            </div>
            <div>
              <Users className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Construirea comunității</h4>
              <p className="text-sm text-muted-foreground">
                Conectează-te cu persoane cu aceleași idei și construiește relații durabile
              </p>
            </div>
            <div>
              <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Focus local</h4>
              <p className="text-sm text-muted-foreground">
                Susținerea artiștilor, afacerilor și inițiativelor comunitare locale
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Ai o idee pentru un eveniment sau vrei să găzduiești ceva în spațiul nostru?
            </p>
            <Button variant="outline" size="lg">
              Contactează-ne despre evenimente
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Events;
