export const emailService = {
  async sendNewBlogPostEmail(post, subscribers) {
    const resendKey = import.meta.env.VITE_RESEND_API_KEY;
    const isLive = !!resendKey;
    
    const blogUrl = `${window.location.origin}/blog/${post.id}`;
    const subject = `New Legal Briefing: ${post.title}`;
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 8px;">
        <h2 style="color: #1c2f54; font-family: serif; border-bottom: 2px solid #cc2027; padding-bottom: 10px;">M.S. OCHIENG LEGAL BRIEFING</h2>
        <p style="font-size: 14px; color: #cc2027; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">${post.category}</p>
        <h3 style="font-family: serif; font-size: 20px; color: #1c2f54; margin-top: 5px;">${post.title}</h3>
        <p style="color: #555; font-size: 15px; line-height: 1.6;">${post.snippet}</p>
        <div style="margin: 30px 0; text-align: center;">
          <a href="${blogUrl}" style="background-color: #cc2027; color: white; text-decoration: none; padding: 12px 30px; font-weight: bold; border-radius: 4px; display: inline-block;">Read Legal Briefing</a>
        </div>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="font-size: 11px; color: #999; text-align: center;">You received this email because you subscribed to legal briefings from M.S. Ochieng Legal.<br/>Innovation. Integrity. Excellence.</p>
      </div>
    `;

    if (isLive) {
      try {
        const emails = subscribers.map(s => s.email);
        if (emails.length === 0) return { success: true, message: "No subscribers to send to." };

        const response = await fetch('/api/resend/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendKey}`
          },
          body: JSON.stringify({
            from: 'briefings@msochienglaw.co.ke',
            to: 'martina@msochienglaw.co.ke', // Main recipient to prevent empty TO field issues
            bcc: emails,
            subject: subject,
            html: html
          })
        });
        
        const result = await response.json();
        this._logReport({
          type: 'Newsletter',
          recipient: `${emails.length} subscribers`,
          status: response.ok ? 'Sent' : 'Failed',
          details: response.ok ? 'Dispatched via Resend Server' : JSON.stringify(result)
        });
        return { success: response.ok, data: result };
      } catch (err) {
        console.error("Resend API failed", err);
        return { success: false, error: err };
      }
    } else {
      this._logReport({
        type: 'Newsletter (Simulation)',
        recipient: `${subscribers.length} subscribers`,
        status: 'Simulated',
        details: `Subscribers would have received: "${post.title}". Set VITE_RESEND_API_KEY to enable live delivery.`
      });
      return { success: true, simulated: true };
    }
  },

  async sendConsultationReply(clientEmail, clientName, replyText) {
    const resendKey = import.meta.env.VITE_RESEND_API_KEY;
    const isLive = !!resendKey;
    
    const subject = `Response to your Legal Consultation Request - M.S. Ochieng Legal`;
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 8px;">
        <h2 style="color: #1c2f54; font-family: serif; border-bottom: 2px solid #cc2027; padding-bottom: 10px;">M.S. OCHIENG LEGAL</h2>
        <p style="font-size: 15px; color: #333; line-height: 1.6;">Dear ${clientName},</p>
        <p style="font-size: 15px; color: #333; line-height: 1.8; white-space: pre-line;">${replyText}</p>
        <p style="font-size: 15px; color: #333; margin-top: 30px;">Best Regards,<br/><strong>Martina Stacy Achieng</strong><br/>Principal Admin<br/>M.S. Ochieng Legal</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="font-size: 11px; color: #999; text-align: center;">M.S. Ochieng Legal | Corporate & Dispute Resolution Chambers.<br/>Innovation. Integrity. Excellence.</p>
      </div>
    `;

    if (isLive) {
      try {
        const response = await fetch('/api/resend/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendKey}`
          },
          body: JSON.stringify({
            from: 'consultation@msochienglaw.co.ke',
            to: clientEmail,
            subject: subject,
            html: html
          })
        });
        
        const result = await response.json();
        const status = response.ok ? 'Sent' : 'Failed';
        const details = response.ok ? 'Delivered to client inbox' : JSON.stringify(result);
        
        this._logReport({
          type: 'Consultation Reply',
          recipient: clientEmail,
          status,
          details
        });
        
        return { success: response.ok, status, details };
      } catch (err) {
        console.error("Resend API failed", err);
        return { success: false, status: 'Failed', details: err.message };
      }
    } else {
      const status = 'Simulated';
      const details = `Reply sent to ${clientEmail} (simulation). Set VITE_RESEND_API_KEY in .env to go live.`;
      
      this._logReport({
        type: 'Consultation Reply (Simulation)',
        recipient: clientEmail,
        status,
        details
      });
      
      return { success: true, status, details };
    }
  },

  _logReport(report) {
    if (typeof window !== 'undefined') {
      const logs = JSON.parse(localStorage.getItem('mso_delivery_reports') || '[]');
      logs.unshift({
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toLocaleString(),
        ...report
      });
      localStorage.setItem('mso_delivery_reports', JSON.stringify(logs));
    }
  }
};
