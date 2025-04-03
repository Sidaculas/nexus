import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FlightIcon from '@mui/icons-material/Flight';
import PublicIcon from '@mui/icons-material/Public';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SupportIcon from '@mui/icons-material/Support';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Homepage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          height: { xs: '80vh', md: '90vh' },
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'primary.light',
          overflow: 'hidden'
        }}
      >
        {/* Background Image with Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/images/hero-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)'
            },
            zIndex: 0
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  color: 'white',
                  fontWeight: 700,
                  mb: 2,
                  textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
                }}
              >
                Your Global Fertility Concierge
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white',
                  mb: 4,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                Breaking down barriers to parenthood with affordable, accessible fertility options worldwide
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  href="/onboarding-quiz"
                  sx={{ py: 1.5, px: 3 }}
                >
                  Start Your Journey
                </Button>
                <Button 
                  variant="outlined" 
                  color="inherit"
                  size="large"
                  href="/our-story"
                  sx={{ 
                    py: 1.5, 
                    px: 3, 
                    borderColor: 'white', 
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Our Story
                </Button>
              </Box>
              
              {/* Feature Pills */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip 
                  icon={<LocalHospitalIcon />} 
                  label="Global Clinic Matching" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.9)', 
                    color: 'primary.main',
                    fontWeight: 500,
                    mb: 1
                  }} 
                />
                <Chip 
                  icon={<PublicIcon />} 
                  label="Donor Database" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.9)', 
                    color: 'primary.main',
                    fontWeight: 500,
                    mb: 1
                  }} 
                />
                <Chip 
                  icon={<AttachMoneyIcon />} 
                  label="Affordable Options" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.9)', 
                    color: 'primary.main',
                    fontWeight: 500,
                    mb: 1
                  }} 
                />
                <Chip 
                  icon={<SupportIcon />} 
                  label="AI Fertility Coach" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.9)', 
                    color: 'primary.main',
                    fontWeight: 500,
                    mb: 1
                  }} 
                />
                <Chip 
                  icon={<FlightIcon />} 
                  label="Travel Planning" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.9)', 
                    color: 'primary.main',
                    fontWeight: 500,
                    mb: 1
                  }} 
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Personal Story Highlight */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="/images/founder-with-baby.jpg"
                alt="Founder with baby Violet"
                sx={{ 
                  width: '100%', 
                  borderRadius: 2,
                  boxShadow: 3
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="overline" color="primary" fontWeight={600}>
                OUR STORY
              </Typography>
              <Typography variant="h3" component="h2" gutterBottom>
                A 14-Year Journey to Parenthood
              </Typography>
              <Typography variant="body1" paragraph>
                In 2009, I faced a devastating cervical cancer diagnosis that threatened to end our dream of having a child. After finding a rare fertility-sparing surgery and battling infertility for 14 years, we finally welcomed our daughter Violet in 2021.
              </Typography>
              <Typography variant="body1" paragraph>
                My experience with international fertility treatment in Mexico—which was both affordable and high-quality—inspired me to create IVF Nexus. I believe no one should have to give up on their dream of parenthood because of cost or complexity.
              </Typography>
              <Button 
                variant="outlined" 
                color="primary"
                endIcon={<ArrowForwardIcon />}
                href="/our-story"
                sx={{ mt: 2 }}
              >
                Read Our Full Story
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* How It Works */}
      <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="overline" color="primary" fontWeight={600}>
              HOW IT WORKS
            </Typography>
            <Typography variant="h3" component="h2" gutterBottom>
              Your Path to Parenthood
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto' }}>
              IVF Nexus simplifies your fertility journey with personalized guidance every step of the way
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card elevation={2} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      fontSize: 24,
                      fontWeight: 700
                    }}
                  >
                    1
                  </Box>
                  <Typography variant="h5" gutterBottom>
                    Personalized Assessment
                  </Typography>
                  <Typography variant="body1">
                    Take our comprehensive onboarding quiz to help us understand your unique needs, preferences, and circumstances. This information allows us to provide tailored recommendations for your fertility journey.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card elevation={2} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      fontSize: 24,
                      fontWeight: 700
                    }}
                  >
                    2
                  </Box>
                  <Typography variant="h5" gutterBottom>
                    AI-Powered Matching
                  </Typography>
                  <Typography variant="body1">
                    Our advanced AI technology matches you with global fertility clinics and donor options based on your medical needs, budget, location preferences, and legal considerations. Compare options side-by-side to make informed decisions.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card elevation={2} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      fontSize: 24,
                      fontWeight: 700
                    }}
                  >
                    3
                  </Box>
                  <Typography variant="h5" gutterBottom>
                    Comprehensive Support
                  </Typography>
                  <Typography variant="body1">
                    Access personalized legal guidance, fertility travel planning, and our AI fertility coach for emotional and informational support throughout your journey. We're with you every step of the way, from initial research to treatment completion.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Box textAlign="center" mt={6}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              href="/onboarding-quiz"
              sx={{ py: 1.5, px: 4 }}
            >
              Start Your Assessment
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Key Features */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="overline" color="primary" fontWeight={600}>
              KEY FEATURES
            </Typography>
            <Typography variant="h3" component="h2" gutterBottom>
              All-In-One Fertility Platform
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto' }}>
              IVF Nexus combines everything you need for your fertility journey in one user-friendly platform
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}>
              <Card elevation={1} sx={{ height: '100%', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/images/clinic-matching.jpg"
                  alt="Clinic matching"
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    Global Clinic Matching
                  </Typography>
                  <Typography variant="body1">
                    Our AI-powered system connects you with fertility clinics worldwide based on your specific needs, preferences, and budget. Compare success rates, costs, and services to find your perfect match.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <Card elevation={1} sx={{ height: '100%', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/images/donor-matching.jpg"
                  alt="Donor matching"
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    Donor Matching
                  </Typography>
                  <Typography variant="body1">
                    Access a comprehensive database of egg, sperm, and embryo donors from around the world. Our platform helps you find donors that match your preferences while navigating different countries' regulations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <Card elevation={1} sx={{ height: '100%', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/images/legal-guidance.jpg"
                  alt="Legal guidance"
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    Legal Guidance
                  </Typography>
                  <Typography variant="body1">
                    Navigate the complex legal landscape of international fertility treatments with our country-specific legal guides. Understand regulations, documentation requirements, and parental rights across different jurisdictions.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <Card elevation={1} sx={{ height: '100%', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/images/fertility-coach.jpg"
                  alt="AI fertility coach"
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    AI Fertility Coach
                  </Typography>
                  <Typography variant="body1">
                    Our supportive and empathetic AI coach provides 24/7 guidance on physical, emotional, and practical aspects of your fertility journey. Get answers to your questions and personalized support whenever you need it.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <Card elevation={1} sx={{ height: '100%', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/images/travel-planning.jpg"
                  alt="Travel planning"
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    Fertility Travel Planning
                  </Typography>
                  <Typography variant="body1">
                    Simplify your fertility travel with our comprehensive planning tools. From accommodation recommendations near clinics to treatment-friendly travel itineraries, we make international fertility care accessible.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <Card elevation={1} sx={{ height: '100%', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/images/community-support.jpg"
                  alt="Community support"
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    Community & Resources
                  </Typography>
                  <Typography variant="body1">
                    Connect with others on similar journeys and access our extensive library of educational resources, success stories, and expert advice to help you navigate every aspect of your fertility journey.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Testimonial */}
      <Box 
        sx={{ 
          py: 10, 
          bgcolor: 'primary.main',
          color: 'primary.contrastText'
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center">
            <FormatQuoteIcon sx={{ fontSize: 60, opacity: 0.7, mb: 2 }} />
            <Typography variant="h4" component="blockquote" gutterBottom sx={{ fontStyle: 'italic', mb: 4 }}>
              "After three failed IVF cycles in the US that drained our savings, we were losing hope. Through IVF Nexus, we found a clinic in Greece that offered the same quality care at one-third the cost. Today, we're parents to twins, and we couldn't be happier."
            </Typography>
            <Avatar
              src="/images/testimonial-avatar.jpg"
              alt="Sarah Johnson"
              sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
            />
            <Typography variant="h6">
              Sarah & Mark Johnson
            </Typography>
            <Typography variant="body1">
              Found affordable IVF in Greece through IVF Nexus
            </Typography>
          </Box>
        </Container>
      </Box>
      
      {/* Why Choose Us */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" color="primary" fontWeight={600}>
                WHY CHOOSE US
              </Typography>
              <Typography variant="h3" component="h2" gutterBottom>
                Built from Personal Experience
              </Typography>
              <Typography variant="body1" paragraph>
                IVF Nexus was created by someone who has walked in your shoes. After a 14-year fertility journey that included cancer, multiple failed IVF cycles, and finally success with international treatment, we understand the challenges you face.
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Firsthand Experience" 
                    secondary="Created by someone who has navigated the complex fertility journey" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Global Perspective" 
                    secondary="Access to worldwide options beyond your local limitations" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Comprehensive Support" 
                    secondary="Medical, emotional, legal, and practical guidance in one platform" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Affordability Focus" 
                    secondary="Committed to making fertility treatments financially accessible" 
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="/images/why-choose-us.jpg"
                alt="IVF Nexus team"
                sx={{ 
                  width: '100%', 
                  borderRadius: 2,
                  boxShadow: 3
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Call to Action */}
      <Box 
        sx={{ 
          py: 10, 
          bgcolor: 'secondary.main',
          color: 'secondary.contrastText'
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Begin Your Fertility Journey Today
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, fontWeight: 'normal' }}>
            Take the first step toward affordable, accessible fertility care with our personalized assessment
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            href="/onboarding-quiz"
            sx={{ py: 1.5, px: 4 }}
          >
            Start Your Assessment
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Homepage;
