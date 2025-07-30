export const getFirebaseAuthErrorMessage = (errorCode) => {
    const errorMessages = {
      // common errors
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/operation-not-allowed': 'Operation not allowed. Please contact support.',
      'auth/too-many-requests': 'Too many requests. Try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
      'auth/internal-error': 'Internal error. Please try again.',
  
      // login-error
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/invalid-credential': 'Invalid email or password.',
      'auth/user-disabled': 'This account has been disabled.',
  
      // signup-error
      'auth/email-already-in-use': 'This email is already registered.',
    //   'auth/weak-password': 'Password should be at least 6 characters long.',
    }
  
    return errorMessages[errorCode] || 'Authentication failed. Please try again.'
  }
  