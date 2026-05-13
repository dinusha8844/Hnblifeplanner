export const validateNIC = (nic: string): { isValid: boolean; error?: string } => {
  const cleanNic = nic.replace(/\s/g, '');
  const oldNicRegex = /^[0-9]{9}[vVxX]$/;
  const newNicRegex = /^[0-9]{12}$/;

  if (oldNicRegex.test(cleanNic)) {
    return { isValid: true };
  }

  if (newNicRegex.test(cleanNic)) {
    return { isValid: true };
  }

  return { 
    isValid: false, 
    error: "Invalid NIC format. Use Old (123456789V) or New (200012345678)." 
  };
};

export const validateMobile = (mobile: string): { isValid: boolean; error?: string } => {
  const cleanMobile = mobile.replace(/\s/g, '');
  // Accepts 07XXXXXXXX or 7XXXXXXXX
  const mobileRegex = /^(0?7)[0-9]{8}$/;
  if (mobileRegex.test(cleanMobile)) {
    return { isValid: true };
  }
  return { 
    isValid: false, 
    error: "Invalid Mobile Number. Use format 07XXXXXXXX (10 digits) or 7XXXXXXXX (9 digits)." 
  };
};

export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email) return { isValid: true }; // Email is optional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) {
    return { isValid: true };
  }
  return { 
    isValid: false, 
    error: "Invalid email format. Please enter a valid email address." 
  };
};

export const formatWhatsAppMessage = (data: {
  fullName: string;
  email?: string;
  nic: string;
  dob: string;
  mobile: string;
  address: string;
  requirement: string;
}): string => {
  return `*New Insurance Lead (Life Planner App)*

Full Name: ${data.fullName}
Email: ${data.email || 'N/A'}
NIC: ${data.nic}
DOB: ${data.dob}
Mobile: ${data.mobile}
Address: ${data.address || 'N/A'}

*Requirement:*
${data.requirement || 'N/A'}`;
};
