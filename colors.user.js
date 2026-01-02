// ==UserScript==
// @name         Old Panel Dark Mode
// @author       Staff
// @version      1.0
// @description  Turn the staff panel dark
// @match        https://www.torn.com/admin/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
  /* Body */
  body, body[class], body[id], body[data-theme] {
    background-color: #191919 !important;
  }

  /* Main content */
  .col-12.col-md-8.content-area-wrapper {
    background-color: #333333 !important;
  }

  /* Headers */
  h1, h2, h3, h4 {
    color: #efb300;
    border-bottom: 1px solid #4d4d4d !important;
  }
  .firstHeading {
    border-bottom: none !important;
  }

  /* Paragraphs */
  p {
    color: white !important;
  }

  /* List */
  li {
    color: #a2a9b1 !important;
  }

  /* Link colors */
  a, .toctogglelabel {
    color: #4cc9ff !important;
  }

  /* Button */
  .torn-mass-collapse-control a {
    color: white !important;
    background-color: #4d4d4d !important;
    border: none !important;
  }

  /* Top navigation */
  .card.torn-navigation-header {
    background-image: none !important;
    background-color: #333333 !important;
  }
  .torn-back-button {
    color: white !important;
  }

  /* Bottom navigation */
  .card.torn-navigation-panel {
    background-color: #333333 !important;
  }

  /* Footer */
  .list-inline {
    color: #a2a9b1 !important;
  }
  .catlinks {
    border: 0.5px solid #4d4d4d !important;
  }

  /* Misc */
  pre {
    background-color: #292929 !important;
    color: white !important;
    border: none !important;
  }
  th {
    background-color: #292929 !important;
    color: white !important;
  }
  .content-area-wrapper #content {
    color: #a2a9b1 !important;
  }

  /* Fieldset container */
  .form-row fieldset {
    background-color: #262626 !important;
    border: 1px solid #4d4d4d !important;
    border-radius: 8px !important;
    color: #e6e6e6 !important;
  }
  .form-row fieldset > legend {
    background-color: #1b1b1b !important;
    color: #efb300 !important;
    padding: 4px 10px !important;
    border: 1px solid #4d4d4d !important;
    border-radius: 6px !important;
  }

  select.dt-input {
    color: #ffffff !important;
    background-color: #2b2b2b !important;
    border: 1px solid #555 !important;
  }

  /* Table */
  .table th {
    border: 2px solid #4d4d4d !important;
  }
  .table td {
    border: 1px solid #4d4d4d !important;
  }
  td {
    background-color: #292929 !important;
    color: white !important;
  }
  .content-area-wrapper #content table.wikitable.mw-collapsible tr:first-child > th,
  .content-area-wrapper #content table.wikitable.mw-collapsible tr:first-child > td {
    background-color: #333333 !important;
    color: white !important;
    border-top: 0.5px solid #737373 !important;
  }
`);
