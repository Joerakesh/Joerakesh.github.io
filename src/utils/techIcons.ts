
// Technology icon mapping using DevIcons CDN
export const getTechIcon = (tech: string): string => {
  const techName = tech.toLowerCase();
  const baseUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
  
  const iconMap: { [key: string]: string } = {
    // Frontend
    react: `${baseUrl}/react/react-original.svg`,
    javascript: `${baseUrl}/javascript/javascript-original.svg`,
    typescript: `${baseUrl}/typescript/typescript-original.svg`,
    html: `${baseUrl}/html5/html5-original.svg`,
    html5: `${baseUrl}/html5/html5-original.svg`,
    css: `${baseUrl}/css3/css3-original.svg`,
    css3: `${baseUrl}/css3/css3-original.svg`,
    vue: `${baseUrl}/vuejs/vuejs-original.svg`,
    angular: `${baseUrl}/angularjs/angularjs-original.svg`,
    svelte: `${baseUrl}/svelte/svelte-original.svg`,
    
    // Styling
    tailwind: `${baseUrl}/tailwindcss/tailwindcss-plain.svg`,
    tailwindcss: `${baseUrl}/tailwindcss/tailwindcss-plain.svg`,
    bootstrap: `${baseUrl}/bootstrap/bootstrap-original.svg`,
    sass: `${baseUrl}/sass/sass-original.svg`,
    scss: `${baseUrl}/sass/sass-original.svg`,
    
    // Backend
    nodejs: `${baseUrl}/nodejs/nodejs-original.svg`,
    node: `${baseUrl}/nodejs/nodejs-original.svg`,
    express: `${baseUrl}/express/express-original.svg`,
    nextjs: `${baseUrl}/nextjs/nextjs-original.svg`,
    next: `${baseUrl}/nextjs/nextjs-original.svg`,
    
    // Databases
    mongodb: `${baseUrl}/mongodb/mongodb-original.svg`,
    mysql: `${baseUrl}/mysql/mysql-original.svg`,
    postgresql: `${baseUrl}/postgresql/postgresql-original.svg`,
    firebase: `${baseUrl}/firebase/firebase-plain.svg`,
    supabase: "https://supabase.com/favicon.ico",
    
    // Tools & Platforms
    git: `${baseUrl}/git/git-original.svg`,
    github: `${baseUrl}/github/github-original.svg`,
    vscode: `${baseUrl}/vscode/vscode-original.svg`,
    figma: `${baseUrl}/figma/figma-original.svg`,
    docker: `${baseUrl}/docker/docker-original.svg`,
    
    // Programming Languages
    python: `${baseUrl}/python/python-original.svg`,
    java: `${baseUrl}/java/java-original.svg`,
    php: `${baseUrl}/php/php-original.svg`,
    csharp: `${baseUrl}/csharp/csharp-original.svg`,
    "c#": `${baseUrl}/csharp/csharp-original.svg`,
    
    // Cloud & Services
    aws: `${baseUrl}/amazonwebservices/amazonwebservices-original.svg`,
    azure: `${baseUrl}/azure/azure-original.svg`,
    gcp: `${baseUrl}/googlecloud/googlecloud-original.svg`,
    vercel: "https://assets.vercel.com/image/upload/front/favicon/vercel/57x57.png",
    netlify: "https://www.netlify.com/favicon.ico",
  };
  
  return iconMap[techName] || `${baseUrl}/devicon/devicon-original.svg`;
};
