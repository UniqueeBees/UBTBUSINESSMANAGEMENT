import { loginLanguageDTO,dashboardLanguageDTO,settingsLanguageDTO,taskLanguageDTO } from "./languageDTO"
export const BuildLoginLanguageDTO=(language)=>{
    let dto={...loginLanguageDTO}
    dto.username=language.Username ?language.Username :dto.username;
    dto.password=language.Password ?language.Password :dto.password;
    dto.submit=language['Sign in'] ?language['Sign in'] :dto.submit;
    return dto;
}

export const BuildDashboardLanguageDTO=(language)=>{
    let dto={...dashboardLanguageDTO}
    dto.meetings=language.Meetings ?language.Meetings :dto.meetings;
    dto.tasks=language.Tasks ?language.Tasks :dto.tasks;
    return dto;
}
export const BuildSettingsLanguageDTO=(language)=>{
    let dto={...settingsLanguageDTO}
    dto.changeCompany=language.changeCompany ?language.changeCompany :dto.changeCompany;
    dto.changeLanguage=language['Change Language'] ?language['Change Language'] :dto.changeLanguage;
    dto.changePassword=language['Change Password'] ?language['Change Password'] :dto.changePassword;
    dto.helpLineNumber=language['Call Helpline Number'] ?language['Call Helpline Number'] :dto.helpLineNumber;
    dto.logout=language.Logout ?language.Logout :dto.logout;
    return dto;
}
export const BuildTaskLanguageDTO=(language)=>{
    let dto={...taskLanguageDTO}
    dto.myTasks=language['My Task'] ?language['My Task'] :dto.myTasks;
    dto.tasks=language.Tasks ?language.Tasks :dto.tasks;
    dto.dueDate=language['Due date:'] ?language['Due date:'] :dto.dueDate;
    return dto;
}