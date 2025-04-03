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
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FlightIcon from '@mui/icons-material/Flight';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import CelebrationIcon from '@mui/icons-material/Celebration';
import WarningIcon from '@mui/icons-material/Warning';
import HealingIcon from '@mui/icons-material/Healing';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PersonalStory = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          A 14-year journey to parenthood that inspired IVF Nexus
        </Typography>
        <Divider sx={{ width: '10%', mx: 'auto', mb: 4, borderWidth: 2, borderColor: 'primary.main' }} />
      </Box>
      
      {/* Hero Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 6, 
          borderRadius: 2,
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.7)), url(/images/family-photo.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              From Cancer Diagnosis to Miracle Baby
            </Typography>
            <Typography variant="body1" paragraph>
              In 2009, my husband Tyler and I faced a devastating diagnosis: a rare form of cervical cancer. Doctors told me I needed a hysterectomy, which would end our dream of having a child. Refusing to accept this, I spent weeks researching and found a rare fertility-sparing surgery (RVT). Despite the risks, I took the chance.
            </Typography>
            <Typography variant="body1">
              The surgery was successful, but our journey wasn't over. For 14 years, we battled infertility, multiple failed IVF cycles, financial challenges, and heartbreaking losses. After relentless searching for affordable options, we found an IVF clinic in Cancun that offered quality care at a fraction of the cost. After several failed attempts and heartbreaks, we finally welcomed our daughter Violet in 2021.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box 
              component="img"
              src="/images/founder-with-baby.jpg"
              alt="Founder with baby Violet"
              sx={{ 
                width: '100%', 
                borderRadius: 2,
                boxShadow: 3,
                border: '5px solid white'
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      
      {/* Timeline */}
      <Box mb={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Our Fertility Journey Timeline
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" paragraph sx={{ mb: 4 }}>
          A 14-year path to parenthood filled with challenges, hope, and perseverance
        </Typography>
        
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              2009
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="error">
                <WarningIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} sx={{ p: 3, bgcolor: 'error.light', color: 'error.contrastText' }}>
                <Typography variant="h6" component="span">
                  Cancer Diagnosis
                </Typography>
                <Typography>Diagnosed with rare cervical cancer. Doctors recommended hysterectomy.</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              2009
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <SearchIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" component="span">
                  Research & Hope
                </Typography>
                <Typography>Discovered rare fertility-sparing surgery (RVT) that could treat cancer while preserving fertility.</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              2010
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success">
                <HealingIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} sx={{ p: 3, bgcolor: 'success.light', color: 'success.contrastText' }}>
                <Typography variant="h6" component="span">
                  Successful Surgery
                </Typography>
                <Typography>Underwent successful RVT surgery. Cancer treated while preserving fertility potential.</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              2010-2019
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="warning">
                <AccessTimeIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" component="span">
                  Years of Struggle
                </Typography>
                <Typography>Multiple failed IVF cycles in North America. Financial strain and emotional heartbreak.</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              2019
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="info">
                <FlightIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} sx={{ p: 3, bgcolor: 'info.light', color: 'info.contrastText' }}>
                <Typography variant="h6" component="span">
                  International Options
                </Typography>
                <Typography>Researched international fertility clinics. Found affordable, quality care in Cancun, Mexico.</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              2020
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <MedicalServicesIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" component="span">
                  Treatment in Mexico
                </Typography>
                <Typography>Began IVF treatment at Cancun clinic. Experienced more setbacks but continued with hope.</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              2021
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success">
                <ChildCareIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} sx={{ p: 3, bgcolor: 'success.light', color: 'success.contrastText' }}>
                <Typography variant="h6" component="span">
                  Miracle Baby
                </Typography>
                <Typography>After 14 years of trying, welcomed our daughter Violet into the world.</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              2023
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary">
                <FavoriteIcon />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} sx={{ p: 3, bgcolor: 'secondary.light', color: 'secondary.contrastText' }}>
                <Typography variant="h6" component="span">
                  IVF Nexus Born
                </Typography>
                <Typography>Created IVF Nexus to help others access affordable fertility care worldwide.</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Box>
      
      {/* Lessons Learned */}
      <Box mb={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Lessons From Our Journey
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" paragraph sx={{ mb: 4 }}>
          Key insights that shaped IVF Nexus and might help you on your path
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    1
                  </Box>
                  <Typography variant="h6">Be Your Own Advocate</Typography>
                </Box>
                <Typography variant="body1">
                  When faced with my cancer diagnosis, I refused to accept the first opinion. By researching alternatives and advocating for myself, I found a fertility-sparing surgery that changed my life's trajectory. Never stop asking questions and seeking alternatives.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    2
                  </Box>
                  <Typography variant="h6">Think Globally</Typography>
                </Box>
                <Typography variant="body1">
                  Fertility care varies dramatically in cost and accessibility around the world. By looking beyond our borders, we found quality treatment at a fraction of the cost. Geographic boundaries shouldn't limit your family-building options.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    3
                  </Box>
                  <Typography variant="h6">Perseverance Matters</Typography>
                </Box>
                <Typography variant="body1">
                  Our journey took 14 years, multiple failed treatments, and countless setbacks. Each failure was devastating, but we kept going. Fertility journeys often take unexpected turns, but persistence can lead to success even when the odds seem impossible.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    4
                  </Box>
                  <Typography variant="h6">Financial Creativity</Typography>
                </Box>
                <Typography variant="body1">
                  The financial burden of fertility treatments can be overwhelming. We learned to think creatively about financing—exploring international options, considering different payment structures, and prioritizing treatment over other expenses. There are often more options than initially apparent.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    5
                  </Box>
                  <Typography variant="h6">Emotional Support</Typography>
                </Box>
                <Typography variant="body1">
                  The emotional toll of infertility can be as challenging as the physical and financial aspects. Finding support—whether through partners, support groups, counseling, or online communities—is essential for navigating the ups and downs of this journey.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    6
                  </Box>
                  <Typography variant="h6">Pay It Forward</Typography>
                </Box>
                <Typography variant="body1">
                  Our struggles and eventual success inspired us to create IVF Nexus. By sharing our story and creating resources for others, we've found meaning in our challenges. Your journey, whatever its outcome, can help others facing similar obstacles.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      
      {/* Why We Created IVF Nexus */}
      <Box mb={8} bgcolor="grey.100" p={4} borderRadius={2}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Why We Created IVF Nexus
            </Typography>
            <Typography variant="body1" paragraph>
              After our long journey to parenthood, we realized how many barriers exist for those seeking fertility treatments. The complexity of navigating options, understanding legal considerations, and managing costs can be overwhelming.
            </Typography>
            <Typography variant="body1" paragraph>
              IVF Nexus was born from our desire to make fertility treatments more accessible and affordable for everyone. We believe that geographic and financial limitations shouldn't prevent anyone from achieving their dream of parenthood.
            </Typography>
            <Typography variant="body1">
              Our platform combines AI-powered clinic and donor matching, legal guidance, and fertility travel planning to simplify the fertility journey. We're committed to empowering individuals and couples with the information, support, and connections they need to make informed decisions about their fertility options.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                To break down barriers to parenthood by connecting individuals and couples with affordable IVF, egg donation, and embryo donation options worldwide.
              </Typography>
              <Typography variant="h5" gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body1">
                A world where everyone has access to the fertility care they need, regardless of geography, finances, or personal circumstances.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
      
      {/* Testimonials */}
      <Box mb={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Stories of Hope
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" paragraph sx={{ mb: 4 }}>
          Families who found their path through IVF Nexus
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image="/images/testimonial-1.jpg"
                alt="Happy family"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  The Johnsons
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Found affordable IVF in Greece
                </Typography>
                <Typography variant="body1">
                  "After three failed IVF cycles in the US that drained our savings, we were losing hope. Through IVF Nexus, we found a clinic in Greece that offered the same quality care at one-third the cost. Today, we're parents to twins, and we couldn't be happier."
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image="/images/testimonial-2.jpg"
                alt="Happy family"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sarah & Maria
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Navigated international egg donation
                </Typography>
                <Typography variant="body1">
                  "As a same-sex couple, we faced additional challenges in our fertility journey. IVF Nexus helped us understand the legal considerations in different countries and connected us with a clinic in Spain with an excellent egg donation program. The legal guidance was invaluable."
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image="/images/testimonial-3.jpg"
                alt="Happy family"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Michael
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Single father through embryo donation
                </Typography>
                <Typography variant="body1">
                  "As a single man, my path to fatherhood seemed complicated and overwhelming. IVF Nexus helped me navigate embryo donation and surrogacy options, connecting me with supportive clinics and legal resources. The AI chatbot was like having a knowledgeable friend available 24/7."
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      
      {/* Call to Action */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" gutterBottom>
          Begin Your Journey with IVF Nexus
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
          Whether you're just starting to explore fertility options or you've been on this path for years, IVF Nexus is here to support you every step of the way. Take our personalized assessment to discover your options.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          endIcon={<ArrowForwardIcon />}
          href="/onboarding-quiz"
          sx={{ py: 1.5, px: 4 }}
        >
          Start Your Personalized Assessment
        </Button>
      </Box>
    </Container>
  );
};

export default PersonalStory;
