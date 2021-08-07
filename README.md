# chromeExtension
Chrome Browser "Leads Tracker" extension. Eg. For use in "sales leads" environment, or something similar.

Had to rewrite the render(leads) function with addEventListener instead of inline event handlers, as Chrome extensions securtiy policy, does not allow use of inline event handlers.
(//This code does not work with Chrome Extensions, as it has an inline event handler, which does not comply with Chrome security policy. I rewrote the code with eventlistener's.)

