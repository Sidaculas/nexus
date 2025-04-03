import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Avatar, 
  CircularProgress,
  IconButton,
  Divider,
  Card,
  CardContent,
  Chip,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';
import HistoryIcon from '@mui/icons-material/History';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';

// Mock data for demonstration
const mockChatHistory = [
  {
    id: 1,
    sender: 'bot',
    message: "Hello! I'm your IVF Nexus AI Fertility Coach. I'm here to provide information, support, and guidance throughout your fertility journey. How can I help you today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5)
  }
];

const mockSuggestedQuestions = [
  "What should I expect during my first IVF cycle?",
  "How can I cope with the emotional stress of fertility treatments?",
  "What are the success rates for IVF at different ages?",
  "Can you explain the egg donation process?",
  "What are some ways to manage medication side effects?"
];

const mockResourceLinks = [
  {
    title: "Understanding IVF Protocols",
    url: "/resources/ivf-protocols",
    icon: "medical"
  },
  {
    title: "Emotional Support During Treatment",
    url: "/resources/emotional-support",
    icon: "emotional"
  },
  {
    title: "Financing Your Fertility Journey",
    url: "/resources/financing",
    icon: "practical"
  }
];

const FertilityChatbot = () => {
  const [messages, setMessages] = useState(mockChatHistory);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState(mockSuggestedQuestions);
  const [resourceLinks, setResourceLinks] = useState(mockResourceLinks);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      message: inputMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate bot response after delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: 'bot',
        message: generateBotResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsTyping(false);
      
      // Update suggested questions based on context
      updateSuggestedQuestions(inputMessage);
    }, 1500);
  };
  
  // Handle pressing Enter to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Handle clicking a suggested question
  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
    // Focus on input field
    document.getElementById('chat-input').focus();
  };
  
  // Mock bot response generation
  const generateBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // IVF related questions
    if (lowerCaseMessage.includes('ivf') && lowerCaseMessage.includes('process')) {
      return "The IVF process typically involves several steps: 1) Ovarian stimulation with fertility medications, 2) Egg retrieval procedure, 3) Fertilization in the laboratory, 4) Embryo culture and development, 5) Embryo transfer to the uterus, and 6) Pregnancy test about two weeks later. Each step is carefully monitored by your medical team. Would you like more details about any specific part of this process?";
    }
    
    // Emotional support
    if (lowerCaseMessage.includes('stress') || lowerCaseMessage.includes('anxious') || lowerCaseMessage.includes('worried') || lowerCaseMessage.includes('emotional')) {
      return "It's completely normal to experience stress, anxiety, and a range of emotions during your fertility journey. Many find relief through support groups, counseling, mindfulness practices, and open communication with partners. Remember that your feelings are valid, and it's important to prioritize your emotional wellbeing. Would you like some specific stress-reduction techniques that have helped others in similar situations?";
    }
    
    // Success rates
    if (lowerCaseMessage.includes('success') && lowerCaseMessage.includes('rate')) {
      return "Success rates for fertility treatments vary based on several factors, including age, diagnosis, and the clinic. For IVF, success rates generally range from 20-50% per cycle, with higher rates for younger patients. For women under 35, success rates are typically around 40-50% per cycle, while for women over 40, rates may be closer to 10-20%. Remember that these are averages, and individual circumstances can significantly impact outcomes. Would you like information about success rates for a specific treatment or age group?";
    }
    
    // Egg donation
    if (lowerCaseMessage.includes('egg donation') || lowerCaseMessage.includes('donor egg')) {
      return "Egg donation involves using eggs from a donor, which are fertilized with sperm and transferred to the recipient's uterus. The process includes selecting a donor, synchronizing cycles, the donor undergoing stimulation and egg retrieval, fertilization with partner's or donor sperm, and embryo transfer to the recipient. Success rates are typically higher than standard IVF (often 50-60% per transfer) as donor eggs usually come from young, healthy women. Would you like more information about finding donors or the legal aspects of egg donation?";
    }
    
    // Medication side effects
    if (lowerCaseMessage.includes('medication') && (lowerCaseMessage.includes('side effect') || lowerCaseMessage.includes('side-effect'))) {
      return "Fertility medications can cause various side effects, including mood swings, bloating, headaches, injection site reactions, and hot flashes. To manage these: 1) For mood swings, practice self-awareness and stress reduction techniques, 2) For bloating, wear comfortable clothing and stay hydrated, 3) For headaches, ensure adequate hydration and rest, 4) For injection site reactions, apply warm compresses and rotate sites, 5) For hot flashes, dress in layers and avoid triggers. If you experience severe symptoms like extreme bloating, rapid weight gain, or difficulty breathing, contact your doctor immediately as these could indicate ovarian hyperstimulation syndrome (OHSS).";
    }
    
    // Default response
    return "Thank you for your question. I'm here to provide information and support throughout your fertility journey. Could you provide a bit more detail about what you'd like to know? I can help with information about treatments, emotional support, physical health considerations, or practical guidance.";
  };
  
  // Update suggested questions based on context
  const updateSuggestedQuestions = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // IVF related
    if (lowerCaseMessage.includes('ivf')) {
      setSuggestedQuestions([
        "What are the success rates for IVF at my age?",
        "How can I prepare my body for IVF?",
        "What are the potential side effects of IVF medications?",
        "How many embryos are typically transferred?",
        "What is the difference between fresh and frozen embryo transfers?"
      ]);
    }
    
    // Emotional support related
    else if (lowerCaseMessage.includes('stress') || lowerCaseMessage.includes('anxious') || lowerCaseMessage.includes('emotional')) {
      setSuggestedQuestions([
        "How can I manage treatment stress day-to-day?",
        "What resources are available for emotional support?",
        "How can I talk to my partner about our fertility challenges?",
        "How do I handle social situations during treatment?",
        "What mindfulness techniques help during fertility treatment?"
      ]);
    }
    
    // Egg donation related
    else if (lowerCaseMessage.includes('egg donation') || lowerCaseMessage.includes('donor egg')) {
      setSuggestedQuestions([
        "How are egg donors screened?",
        "What are the legal considerations with egg donation?",
        "How do I select an egg donor?",
        "What are the success rates with donor eggs?",
        "Should we tell our child about using an egg donor?"
      ]);
    }
    
    // Default questions if no specific context
    else {
      setSuggestedQuestions([
        "What should I expect during my first fertility consultation?",
        "How can I optimize my fertility naturally?",
        "What fertility tests should I consider?",
        "How do I choose the right fertility clinic?",
        "What are my options if IVF isn't successful?"
      ]);
    }
  };
  
  // Format timestamp
  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Render message
  const renderMessage = (message) => {
    const isBot = message.sender === 'bot';
    
    return (
      <Box
        key={message.id}
        sx={{
          display: 'flex',
          justifyContent: isBot ? 'flex-start' : 'flex-end',
          mb: 2
        }}
      >
        {isBot && (
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main', 
              mr: 1,
              width: 40,
              height: 40
            }}
          >
            <SmartToyIcon />
          </Avatar>
        )}
        
        <Box
          sx={{
            maxWidth: '75%',
            minWidth: '100px'
          }}
        >
          <Paper
            elevation={1}
            sx={{
              p: 2,
              bgcolor: isBot ? 'grey.100' : 'primary.light',
              color: isBot ? 'text.primary' : 'primary.contrastText',
              borderRadius: 2,
              borderTopLeftRadius: isBot ? 0 : 2,
              borderTopRightRadius: isBot ? 2 : 0
            }}
          >
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {message.message}
            </Typography>
          </Paper>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              display: 'block', 
              textAlign: isBot ? 'left' : 'right',
              mt: 0.5
            }}
          >
            {formatTime(message.timestamp)}
          </Typography>
        </Box>
        
        {!isBot && (
          <Avatar 
            sx={{ 
              bgcolor: 'secondary.main', 
              ml: 1,
              width: 40,
              height: 40
            }}
          >
            <PersonIcon />
          </Avatar>
        )}
      </Box>
    );
  };
  
  // Render typing indicator
  const renderTypingIndicator = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          mb: 2
        }}
      >
        <Avatar 
          sx={{ 
            bgcolor: 'primary.main', 
            mr: 1,
            width: 40,
            height: 40
          }}
        >
          <SmartToyIcon />
        </Avatar>
        
        <Paper
          elevation={1}
          sx={{
            p: 2,
            bgcolor: 'grey.100',
            borderRadius: 2,
            borderTopLeftRadius: 0,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress size={10} sx={{ mr: 1 }} />
            <CircularProgress size={10} sx={{ mr: 1 }} />
            <CircularProgress size={10} />
          </Box>
        </Paper>
      </Box>
    );
  };
  
  // Render suggested questions
  const renderSuggestedQuestions = () => {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Suggested Questions
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {suggestedQuestions.map((question, index) => (
            <Chip
              key={index}
              label={question}
              onClick={() => handleSuggestedQuestion(question)}
              clickable
              color="primary"
              variant="outlined"
              sx={{ mb: 1 }}
            />
          ))}
        </Box>
      </Box>
    );
  };
  
  // Render resource links
  const renderResourceLinks = () => {
    const getIcon = (type) => {
      switch (type) {
        case 'medical':
          return <LocalHospitalIcon />;
        case 'emotional':
          return <FavoriteIcon />;
        default:
          return <InfoIcon />;
      }
    };
    
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Helpful Resources
        </Typography>
        <List dense>
          {resourceLinks.map((resource, index) => (
            <ListItem 
              key={index}
              button
              component="a"
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemIcon>
                {getIcon(resource.icon)}
              </ListItemIcon>
              <ListItemText primary={resource.title} />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };
  
  // Render drawer content
  const renderDrawerContent = () => {
    return (
      <Box sx={{ width: 250, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Menu</Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <List>
          <ListItem button>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Chat History" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Saved Responses" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Resource Library" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help & FAQ" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Box>
    );
  };
  
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* App Bar */}
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IVF Nexus AI Fertility Coach
          </Typography>
        </Toolbar>
      </AppBar>
      
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Chat Area */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2, overflow: 'hidden' }}>
          {/* Messages Container */}
          <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2, px: 2 }}>
            {messages.map(message => renderMessage(message))}
            {isTyping && renderTypingIndicator()}
            <div ref={messagesEndRef} />
          </Box>
          
          {/* Suggested Questions */}
          {!isMobile && renderSuggestedQuestions()}
          
          {/* Input Area */}
          <Paper
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 2
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <TextField
                id="chat-input"
                fullWidth
                variant="outlined"
                placeholder="Type your message here..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                multiline
                maxRows={4}
                sx={{ mr: 1 }}
              />
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                onClick={handleSendMessage}
                disabled={inputMessage.trim() === ''}
                sx={{ alignSelf: 'flex-end' }}
              >
                Send
              </Button>
            </Box>
            
            {/* Mobile Suggested Questions */}
            {isMobile && renderSuggestedQuestions()}
          </Paper>
        </Box>
        
        {/* Sidebar - only visible on larger screens */}
        {!isMobile && (
          <Box
            sx={{
              width: 300,
              p: 2,
              borderLeft: '1px solid',
              borderColor: 'divider',
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Your Fertility Coach
                </Typography>
                <Typography variant="body2" paragraph>
                  I'm here to provide information, support, and guidance throughout your fertility journey. Ask me anything about treatments, emotional support, or practical considerations.
                </Typography>
                <Typography variant="body2">
                  I'm trained with comprehensive fertility knowledge and designed to be supportive and empathetic to your unique situation.
                </Typography>
              </CardContent>
            </Card>
            
            {renderResourceLinks()}
          </Box>
        )}
      </Box>
      
      {/* Drawer for mobile menu */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {renderDrawerContent()}
      </Drawer>
    </Box>
  );
};

export default FertilityChatbot;
