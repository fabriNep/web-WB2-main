import { Component } from '@angular/core';

import { Hero } from '../../shared/components/hero/hero';
import { Features } from '../../shared/components/features/features';
import { About } from '../../shared/components/about/about';
import { Benefits } from '../../shared/components/benefits/benefits';
import { Testimonials } from '../../shared/components/testimonials/testimonials';
import { Contact } from '../../shared/components/contact/contact';
import { DownloadApp } from '../../shared/components/download-app/download-app';
import { Footer } from '../../core/components/footer/footer';
import { Navbar } from '../../core/components/navbar/navbar';

@Component({
  selector: 'app-landing',
  imports: [
    Navbar,
    Hero,
    Features,
    About,
    Benefits,
    Testimonials,
    Contact,
    DownloadApp,
    Footer,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

}
