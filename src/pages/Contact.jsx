import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Phone, Mail, MessageCircle, Instagram, Facebook } from 'lucide-react';

const Contact = () => {
  const contactInfo = {
    address: {
      street: "123 Community Street",
      city: "Downtown District",
      state: "City",
      zip: "12345"
    },
    phone: "+1 (555) 123-4567",
    email: "hello@biela.dev",
    whatsapp: "+1 (555) 123-4567",
    hours: {
      weekdays: "Monday - Friday: 7:00 AM - 8:00 PM",
      weekends: "Saturday - Sunday: 8:00 AM - 9:00 PM"
    },
    social: {
      instagram: "https://instagram.com/biela.dev",
      facebook: "https://facebook.com/biela.dev",
      tiktok: "https://tiktok.com/@biela.dev"
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We would love to hear from you! Whether you have questions, want to make a reservation, or just want to say hello, we are here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span>Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{contactInfo.address.street}</p>
                  <p className="text-muted-foreground">
                    {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
                  </p>
                  <div className="pt-4">
                    <Button variant="outline" size="sm">
                      Get Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <span>Business Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>{contactInfo.hours.weekdays}</p>
                  <p>{contactInfo.hours.weekends}</p>
                  <p className="text-sm text-muted-foreground pt-2">
                    Special holiday hours may apply. Please call ahead during holidays.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Get In Touch</CardTitle>
                <CardDescription>
                  Choose your preferred way to contact us
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a 
                        href={`tel:${contactInfo.phone}`} 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a 
                        href={`mailto:${contactInfo.email}`} 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">WhatsApp Business</p>
                      <a 
                        href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        Message us on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
                <CardDescription>
                  Stay connected with our community on social media
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <a 
                    href={contactInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <span className="text-sm">Instagram</span>
                  </a>
                  <a 
                    href={contactInfo.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">Facebook</span>
                  </a>
                  <a 
                    href={contactInfo.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                    <span className="text-sm">TikTok</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Find Us</CardTitle>
                <CardDescription>
                  We are located in the heart of the Downtown District, easily accessible by public transportation and with parking available nearby.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Google Maps Embed Placeholder */}
                <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Google Maps Integration</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Interactive map showing our exact location
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Getting Here</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• 2-minute walk from Central Station</p>
                      <p>• Street parking available on Community Street</p>
                      <p>• Public parking garage on 5th Avenue (2 blocks away)</p>
                      <p>• Bike racks available in front of building</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Accessibility</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• Wheelchair accessible entrance</p>
                      <p>• Accessible restrooms available</p>
                      <p>• Clear pathways throughout café</p>
                      <p>• Braille menus available upon request</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <section className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Quick Questions?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For quick questions about our menu, hours, or availability, give us a call!
                </p>
                <Button variant="outline" size="sm">
                  <a href={`tel:${contactInfo.phone}`}>Call Now</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Business Inquiries</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For partnerships, events, or detailed information, email us!
                </p>
                <Button variant="outline" size="sm">
                  <a href={`mailto:${contactInfo.email}`}>Send Email</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <MessageCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Instant Messaging</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Need immediate assistance? Message us on WhatsApp!
                </p>
                <Button variant="outline" size="sm">
                  <a 
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Us
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
