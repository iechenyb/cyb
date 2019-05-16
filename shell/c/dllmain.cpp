/* Replace "dll.h" with the name of your header */
#include "dll.h"
#include <windows.h>
DLLIMPORT __stdcall void HelloWorld()  
{  
    MessageBox(0,"Hello World from DLL!\n","Hi",MB_ICONINFORMATION);  
}  
  
DLLIMPORT __stdcall void HelloWorld1(char *inputString)  
{  
    MessageBox(0,inputString,"Hi",MB_ICONINFORMATION);  
}  
  
DLLIMPORT __stdcall char *HelloWorld2(char *inputString)  
{  
    return inputString;  
}  
  
  
BOOL WINAPI DllMain(HINSTANCE hinstDLL,DWORD fdwReason,LPVOID lpvReserved)  
{  
    switch(fdwReason)  
    {  
        case DLL_PROCESS_ATTACH:  
        {  
            break;  
        }  
        case DLL_PROCESS_DETACH:  
        {  
            break;  
        }  
        case DLL_THREAD_ATTACH:  
        {  
            break;  
        }  
        case DLL_THREAD_DETACH:  
        {  
            break;  
        }  
    }  
      
    /* Return TRUE on success, FALSE on failure */  
    return TRUE;  
}  