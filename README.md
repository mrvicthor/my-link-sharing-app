# Frontend Mentor - Link-sharing app solution

This is a solution to the [Link-sharing app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Create, read, update, delete links and see previews in the mobile mockup
- Receive validations if the links form is submitted without a URL or with the wrong URL pattern for the platform
- Drag and drop links to reorder them
- Add profile details like profile picture, first name, last name, and email
- Receive validations if the profile details form is saved with no first or last name
- Preview their devlinks profile and copy the link to their clipboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: Save details to a database (build the project as a full-stack app)
- **Bonus**: Create an account and log in (add user authentication to the full-stack app)

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [https://github.com/mrvicthor/my-link-sharing-app]
- Live Site URL: [https://link-sharing-app-frontend-34e8.onrender.com]

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [TailwindCSS](https://tailwindcss.com/) - CSS framework

### What I learned

I tried building a fullstack application using MERN stack. This project has given me the opportunity to learn how authentication and authorization works on the backend.

Additionally, I created my own custom Notification component using React createContext hook, and Typescript

I also learned how to use the useQuery hook from the Tanstack Query library to fetch data from the backend.

```js
import React, { createContext, useEffect, useState } from "react";

type NotificationContextType = {
  notification: boolean,
  setNotification: (value: boolean) => void,
};

export const NotificationContext =
  (createContext < NotificationContextType) | (undefined > undefined);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  const [notification, setNotification] = useState < boolean > false;

  useEffect(() => {
    navigator.clipboard.writeText(window.location.href);
    const interval = setTimeout(() => setNotification(false), 3000);
    return () => clearTimeout(interval);
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

import { useContext } from "react";
import { NotificationContext } from "@/context/NotificationContext";

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
```

### Continued development

I plan to explore the NextJs 15, build a full stack application with it.

### Useful resources

- [https://react.dev/reference/react/createContext] - This helped me to avoid prop drilling and to create a custom context.
- [https://tanstack.com/query/v4/docs/framework/react/reference/useQuery] - This is an amazing library which helped me fetch and cache data from the backend with ease.

## Author

- Website - [https://t.co/GyuJhbPKuM]
- Frontend Mentor - [https://www.frontendmentor.io/profile/mrvicthor]
- Twitter - [https://x.com/eva_skillz]

## Acknowledgments

I will like to acknowledge github.com/nikitapryymak. His YouTube tutorial helped me understand authorization and authentication. I will also like to thank Jude for his patience with explaining some programming concepts.
