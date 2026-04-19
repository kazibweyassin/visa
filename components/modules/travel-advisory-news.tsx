import React from "react";

// Placeholder news data
const news = [
  { title: "France updates visa policy", date: "2026-04-10", link: "#", summary: "France has updated its Schengen visa requirements for 2026." },
  { title: "Germany travel advisory", date: "2026-04-05", link: "#", summary: "Germany issues new travel advisory for African countries." },
  // Add more news items as needed
];

export default function TravelAdvisoryNews() {
  return (
    <aside className="bg-gray-50 p-4 rounded shadow mb-8">
      <h2 className="text-2xl font-bold mb-4">Travel Advisory & News</h2>
      <ul>
        {news.map((item, idx) => (
          <li key={idx} className="mb-4">
            <div className="font-semibold">{item.title}</div>
            <div className="text-sm text-gray-500">{item.date}</div>
            <div>{item.summary}</div>
            <a href={item.link} className="text-blue-600 underline">Read more</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}