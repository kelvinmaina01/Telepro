"use client";

import React from "react";

export const VideoDemo = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See TelePro in Action
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Watch how TelePro transforms script reading into professional video creation
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* YouTube Video Embed */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/7vDr85eVEdI"
              title="TelePro Demo - Professional Teleprompter in Action"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-zinc-400 mb-6">
              <strong>TelePro is a form of a teleprompter and or I would call it an autocue.</strong> An autocue is basically a display device that allows speakers to display or to read script. This video shows TelePro in action, focusing on its setup for effective teleprompter practice.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="text-2xl mb-2">🎬</div>
                <h3 className="text-xl font-bold mb-2">Script Preparation</h3>
                <p className="text-zinc-400">See how to prepare and edit scripts in real-time</p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="text-xl font-bold mb-2">Quick Setup</h3>
                <p className="text-zinc-400">Watch the fast configuration and camera integration</p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="text-xl font-bold mb-2">Professional Results</h3>
                <p className="text-zinc-400">See the professional-quality output you can achieve</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};