import { createClient } from '@insforge/sdk';

// InsForge client configuration
export const insforge = createClient({
  baseUrl: 'https://mrdh8z9d.us-west.insforge.app',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC0xMjM0LTU2NzgtOTBhYi1jZGVmMTIzNDU2NzgiLCJlbWFpbCI6ImFub25AaW5zZm9yZ2UuY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MDg4NDd9.zrDvjxSl8Sv2GYHUD8k4XFDTAnt3eQogOLbLWAVhW5s'
});

export default insforge;