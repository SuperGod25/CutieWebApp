import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Phone, Mail, MessageCircle, Instagram, Facebook, Navigation } from 'lucide-react';

const Contact = () => {
  const contactInfo = {
    address: {
      street: "Strada Franklin Delano Roosevelt 2/1",
      city: "Cluj-Napoca",
      state: "Cluj",
      zip: "400021"
    },
    phone: "+40 746 018 659",
    email: "cutie.cafea@gmail.com",
    whatsapp: "+40 746 018 659",
    hours: {
      weekdays: "Luni - Vineri: 7:00 - 20:00",
      weekends: "Sâmbătă - Duminică: 8:00 - 21:00"
    },
    social: {
      instagram: "https://instagram.com/cutie",
      facebook: "https://facebook.com/cutie",
      tiktok: "https://tiktok.com/@cutie"
    },
    mapLink: "https://www.google.com/maps?q=Strada+Franklin+Delano+Roosevelt+2%2F1%2C+Cluj-Napoca",
    mapDirections: "https://www.google.com/maps/dir/?api=1&destination=Strada+Franklin+Delano+Roosevelt+2%2F1,+Cluj-Napoca"
  };

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contactează-ne</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ne poți scrie oricând pentru întrebări, rezervări sau colaborări. Suntem aici pentru tine!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span>Adresă</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={contactInfo.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary font-medium hover:underline"
                >
                  {contactInfo.address.street}<br />
                  {contactInfo.address.city}, România {contactInfo.address.zip}
                </a>
                <div className="pt-4">
                  <Button variant="outline" size="sm" asChild>
                    <a href={contactInfo.mapDirections} target="_blank" rel="noopener noreferrer">
                      Deschide în Google Maps
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <span>Program</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{contactInfo.hours.weekdays}</p>
                <p>{contactInfo.hours.weekends}</p>
                <p className="text-sm text-muted-foreground pt-2">
                  Program special de sărbători – verifică în prealabil.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact direct</CardTitle>
                <CardDescription>Alege canalul preferat:</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href={`tel:${contactInfo.phone}`} className="text-muted-foreground hover:text-primary transition">
                      {contactInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href={`mailto:${contactInfo.email}`} className="text-muted-foreground hover:text-primary transition">
                      {contactInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <a
                      href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition"
                    >
                      Scrie-ne pe WhatsApp
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <a href={contactInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center space-x-2 border p-3 rounded hover:bg-accent">
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <span>Instagram</span>
                  </a>
                  <a href={contactInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center space-x-2 border p-3 rounded hover:bg-accent">
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <span>Facebook</span>
                  </a>
                  <a href={contactInfo.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center space-x-2 border p-3 rounded hover:bg-accent">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                    <span>TikTok</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Google Map */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Harta locației</CardTitle>
                <CardDescription>Ne găsești cu ușurință în zona centrală din Cluj.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-lg shadow border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d625.9263833539189!2d23.58713095727382!3d46.77087535932285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490e9cfa0fe325%3A0x7383598b94315840!2sStrada%20Franklin%20Delano%20Roosevelt%20nr.%202%2F1%2C%20Cluj-Napoca%20400021!5e0!3m2!1sro!2sro!4v1752423919867!5m2!1sro!2sro"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Harta Cutie"
                  ></iframe>
                </div>

                <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                  <h4 className="font-semibold mb-1">Cum ajungi la noi</h4>
                  <ul className="space-y-1">
                    <li>• 2 minute de mers pe jos de la stația centrală</li>
                    <li>• Parcare pe stradă sau la Cluj Parking</li>
                    <li>• Suport pentru biciclete în fața locației</li>
                  </ul>
                  <h4 className="font-semibold mt-4 mb-1">Accesibilitate</h4>
                  <ul className="space-y-1">
                    <li>• Intrare cu rampă</li>
                    <li>• Toalete accesibile</li>
                    <li>• Meniu în Braille disponibil</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating button */}
      <a
        href={contactInfo.mapDirections}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex md:hidden items-center bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-primary/90 transition"
      >
        <Navigation className="h-4 w-4 mr-2" />
        Deschide în Hărți
      </a>
    </div>
  );
};

export default Contact;
