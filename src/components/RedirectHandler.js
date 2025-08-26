import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem("urls")) || [];
    const urlObj = urls.find((u) => u.shortcode === shortcode);

    if (urlObj) {
      const now = new Date();
      if (now > new Date(urlObj.expiry)) {
        alert("This link has expired!");
        return;
      }

      urlObj.clicks.push({
        timestamp: now.toISOString(),
        source: document.referrer || "direct",
        location: "unknown" // (mock for now)
      });

      localStorage.setItem("urls", JSON.stringify(urls));
      window.location.href = urlObj.longURL;
    } else {
      alert("Invalid short URL");
    }
  }, [shortcode]);

  return <div>Redirecting...</div>;
};

export default RedirectHandler;
