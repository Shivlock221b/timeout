/**
 * Mock Message Data
 * 
 * Following the project's rule of separating mock data into dedicated files in the @data directory
 */

export const messageThreadsData = [
  {
    id: 'msg1',
    name: 'Priya Sharma',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    lastMessage: 'Are you coming to the event tonight?',
    timestamp: '2025-04-10T10:30:00',
    unread: 2,
    online: true,
    tags: ['Events']
  },
  {
    id: 'msg2',
    name: 'Rahul Mehra',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'Thanks for the invitation! I\'ll be there.',
    timestamp: '2025-04-10T09:15:00',
    unread: 0,
    online: false,
    tags: ['Events']
  },
  {
    id: 'msg3',
    name: 'Aisha Patel',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'Can we schedule a call to discuss the project?',
    timestamp: '2025-04-09T18:45:00',
    unread: 1,
    online: true,
    tags: ['Private']
  },
  {
    id: 'msg4',
    name: 'Vikram Singh',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    lastMessage: 'The circle meetup is confirmed for Saturday!',
    timestamp: '2025-04-09T15:22:00',
    unread: 0,
    online: false,
    tags: ['Circle']
  },
  {
    id: 'msg5',
    name: 'Neha Gupta',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    lastMessage: 'I sent you the details about the workshop',
    timestamp: '2025-04-08T14:10:00',
    unread: 0,
    online: true,
    tags: ['Events']
  },
  {
    id: 'msg6',
    name: 'Arjun Reddy',
    avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
    lastMessage: 'Looking forward to seeing you at the meetup!',
    timestamp: '2025-04-07T23:05:00',
    unread: 0,
    online: false,
    tags: ['Circle']
  },
  {
    id: 'msg7',
    name: 'Kavita Desai',
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
    lastMessage: 'Can you share your notes from yesterday\'s talk?',
    timestamp: '2025-04-07T11:30:00',
    unread: 3,
    online: true,
    tags: ['Private']
  }
];

export const messageDetailData = {
  'msg1': {
    id: 'msg1',
    name: 'Priya Sharma',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    online: true,
    messages: [
      {
        id: 'm1',
        sender: 'them',
        content: 'Hey there! How are you?',
        timestamp: '2025-04-09T14:30:00'
      },
      {
        id: 'm2',
        sender: 'me',
        content: 'Hi Priya! I\'m doing well, thanks for asking. How about you?',
        timestamp: '2025-04-09T14:32:00'
      },
      {
        id: 'm3',
        sender: 'them',
        content: 'I\'m good too! Just planning for the weekend.',
        timestamp: '2025-04-09T14:35:00'
      },
      {
        id: 'm4',
        sender: 'them',
        content: 'Are you coming to the event tonight?',
        timestamp: '2025-04-10T10:30:00'
      },
      {
        id: 'm5',
        sender: 'them',
        content: 'It\'s going to be amazing with all the people from our community!',
        timestamp: '2025-04-10T10:31:00'
      }
    ]
  }
};
