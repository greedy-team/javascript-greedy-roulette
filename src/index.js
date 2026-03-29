import { viewModel } from './viewmodels/RouletteViewModel.js';
import{view}from './views/RouletteView.js';

view.bindEvents(viewModel);

viewModel.init();
