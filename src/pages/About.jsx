import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Leaf, Target, Award, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const impactStats = [
    { label: "Community Members Served", value: "500+", icon: <Users className="h-6 w-6" /> },
    { label: "Local Partnerships", value: "25", icon: <Heart className="h-6 w-6" /> },
    { label: "Eco-Friendly Initiatives", value: "15", icon: <Leaf className="h-6 w-6" /> },
    { label: "Events Hosted", value: "50+", icon: <Coffee className="h-6 w-6" /> }
  ];

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Founder & Director",
      description: "Passionate about creating inclusive spaces that bring communities together through shared experiences.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop"
    },
    {
      name: "Marcus Johnson",
      role: "Head of Community Engagement",
      description: "Dedicated to building meaningful connections and organizing events that celebrate diversity.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop"
    },
    {
      name: "Elena Rodriguez",
      role: "Sustainability Coordinator",
      description: "Leading our environmental initiatives and partnerships with local sustainable businesses.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About Biela.dev</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            More than just a café and flower shop - we are a social enterprise dedicated to building community through inclusion, sustainability, and connection.
          </p>
        </div>

        {/* Story Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">The Cutie Project Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  biela.dev began as a simple idea: what if a café could be more than just a place to grab coffee? 
                  What if it could be a catalyst for positive social change, a space where everyone feels welcome, 
                  and a hub for sustainable community initiatives?
                </p>
                <p>
                  Founded in 2023, our "cutie project" started with the belief that small actions can create big impact. 
                  We combine the comfort of expertly crafted coffee with the beauty of locally sourced flowers, 
                  all while maintaining a steadfast commitment to inclusion and environmental responsibility.
                </p>
                <p>
                  Every cup of coffee sold supports fair trade farmers. Every flower arrangement celebrates local growers. 
                  Every event we host brings together people from all walks of life. This is how we are building a more 
                  connected and sustainable community, one interaction at a time.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop"
                alt="Café interior"
                className="rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1481833761820-0509d3217039?w=300&h=200&fit=crop"
                alt="Fresh flowers"
                className="rounded-lg shadow-lg mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300&h=200&fit=crop"
                alt="Community gathering"
                className="rounded-lg shadow-lg -mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=200&fit=crop"
                alt="Coffee preparation"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Target className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To create an inclusive community space that promotes social connection, environmental sustainability, 
                  and economic empowerment through thoughtfully curated experiences centered around coffee, flowers, and genuine human interaction.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A world where every neighborhood has a space like biela.dev - where differences are celebrated, 
                  sustainability is the norm, and community connections flourish naturally through shared experiences and mutual respect.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Since opening our doors, we have been proud to make a positive difference in our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Drives Us</h2>
            <p className="text-muted-foreground">
              Our three core values guide every decision we make and every interaction we have.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Inclusion</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We believe diversity makes us stronger. Our space welcomes people of all backgrounds, abilities, 
                  ages, and identities. Accessibility and inclusivity are built into everything we do.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Environmental responsibility is not optional. From our zero-waste initiatives to supporting 
                  local suppliers, we are committed to reducing our impact and promoting sustainable practices.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We exist to bring people together. Through events, collaborations, and daily interactions, 
                  we foster genuine connections that strengthen our local community.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground">
              The passionate people behind biela.dev who make our mission possible every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you are looking for great coffee, beautiful flowers, or meaningful connections, 
            biela.dev is your space. Come be part of something bigger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/events">Explore Events</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
