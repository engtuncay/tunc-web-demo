/* @refresh reload */
import { render } from 'solid-js/web'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import App from './App.tsx'
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const root = document.getElementById('root')

render(() => <App />, root!)
