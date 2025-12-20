import React from 'react';
import { Hero } from './Hero';
import { Services } from './Services';
import { WorkShowcase } from './WorkShowcase';
import { RecentWorks } from './RecentWorks';
import { Team } from './Team';
import { CTA } from './CTA';

export const Home = () => {
    return (
        <main>
            <Hero />
            <Services />
            <WorkShowcase />
            <RecentWorks />
            <Team />
            <CTA />
        </main>
    );
};
