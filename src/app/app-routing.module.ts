import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './shared/services/admin.guard';
import { AuthGuard } from './shared/services/auth.guard';
import { PremiumGuard } from './shared/services/premium.guard';
import { VisitorGuard } from './shared/services/visitor.guard';

const routes: Routes = [
  { 
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
  },
  { 
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then(m => m.HelpModule)
  },
  { 
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
  },
  { 
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule)
  },
  { 
    path: 'signup',
    loadChildren: () => import('./auth/signup/signup.module').then(m => m.SignupModule),
    canActivate: [VisitorGuard]
  },
  { 
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule),
    canActivate: [VisitorGuard]
  },
  { 
    path: 'edit',
    loadChildren: () => import('./auth/modifydata/modifydata.module').then(m => m.ModifydataModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'games',
    loadChildren: () => import('./pages/games/games.module').then(m => m.GamesModule)
  },
  { 
    path: 'stats',
    loadChildren: () => import('./pages/stats/stats.module').then(m => m.StatsModule),
    canActivate: [PremiumGuard]
  },
  { 
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  { 
    path: 'memory-matrix',
    loadChildren: () => import('./games/memory-matrix/memory-matrix.module').then(m => m.MemoryMatrixModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'speed-match',
    loadChildren: () => import('./games/speed-match/speed-match.module').then(m => m.SpeedMatchModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'odd-one-out',
    loadChildren: () => import('./games/odd-one-out/odd-one-out.module').then(m => m.OddOneOutModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'colour-match',
    loadChildren: () => import('./games/colour-match/colour-match.module').then(m => m.ColourMatchModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'sequence',
    loadChildren: () => import('./games/sequence/sequence.module').then(m => m.SequenceModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'continuum',
    loadChildren: () => import('./games/continuum/continuum.module').then(m => m.ContinuumModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'chalkboard',
    loadChildren: () => import('./games/chalkboard/chalkboard.module').then(m => m.ChalkboardModule),
    canActivate: [AuthGuard]
  },
  { 
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  { 
    path: '**',
    redirectTo: '/main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
