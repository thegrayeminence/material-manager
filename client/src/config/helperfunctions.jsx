
// Helper functions for autosuggestion of input boxes for physical properties
// Return the first match alphabetically, or an empty string if no match
export const getClosestMatch = (input, options) => {
    const matches = options.filter(option => option.toLowerCase().startsWith(input.toLowerCase()));
    return matches.sort()[0] || '';
  };
  