// src/pages/alerts/SystemAlert.ts
export class SystemAlert {
    id: string;
    message: string;
    type: string; // 'success', 'warning', 'error', 'info'
  
    constructor(id: string, message: string, type: string) {
      this.id = id;
      this.message = message;
      this.type = type;
    }
  }