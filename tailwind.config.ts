import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/elements/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brown-primary': 'var(--brown-primary)',
        'beige-secondary': 'var(--beige-secondary)',
        'lightbeige-accent': 'var(--lightbeige-accent)',
        'lightbeige-bg': 'var(--lightbeige-bg)',
        'lightgrey-bg': 'var(--lightgrey-bg)',
        'red-fav': 'var(--red-fav)',
        'red-delete': 'var(--red-delete)',
        'red-hot': 'var(--red-hot)',
        'blue-cold': 'var(--blue-cold)',
      },
    },
  },
  plugins: [],
};

export default config;
