(()=> {
  class Logger {
    constructor (year) {
      const logCss = "background-color:#586086; color:#39B7C4; font-size:16px";
      console.log(`%c
-/oo/-'                                    
':+ssssoooo+:.                             
+sssssssoooooooo/-'                        
osssssssooooooooooo+:.                     
osssssssooooooooooooooo/-'                 
osssssss-'./oooooooooooooo+:.              
osssssss-    .:+ooooooooooooo+/-'          
osssssss-       '-/oooooooooooooo+-.       
osssssss-           .:+ooooooooooooo+.     
osssssss-              '-/ooooooooooo:     
osssssso:'                 ./oooooooo-     
ossso++////-.            .:ossssooooo-     
+o+///////////:.'    '-/ossssssssssso-     
'.:///////////////-:ossssssssssssso:.      
    '-//////////////++ossssssss+:'         
      '.://///////////++ooo/-              
      '-/ooo++/////////////:.              
    .:+sssssssso++/////////////:-'         
'-/osssssssssssss+:-///////////////-.      
/+osssssssssso/-'    '.://///////////-     
///++ossss+:.            .-//////////-     
///////+:'                 ./o++/////-     
////////.              '-/ooooooo++//-     
////////.           .:+ooooooooooooo+.     
////////.       '-/oooooooooooooo/-'       
////////.    .:+ooooooooooooo+:.           
////////.'-/oooooooooooooo/-'              
//////+++ooooooooooooo+:.                  
//+++oooooooooooooo/-'                     
:oooooooooooooo+:-                         
'-/oooooooo+:'                             
    .:+o:-'                                
                                           
\xA9 ${year} BILDEPUNKT.COM | ALL RIGHTS RESERVED`, logCss);
    }
  }

  class Footer {
    constructor(year) {
      document.querySelector('footer span').innerHTML = year;
    }
  }

  const year = new Date().getFullYear();
  new Logger(year);
  new Footer(year);

}).call(this);
