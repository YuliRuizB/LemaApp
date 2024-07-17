import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeaderComponent } from "./component/header/header.component";
import { CustomImputComponent } from "./component/custom-imput/custom-imput.component";
import { LogoComponent } from "./component/logo/logo.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        HeaderComponent,
        CustomImputComponent,
        LogoComponent        
    ],
    exports: [
        HeaderComponent,
        CustomImputComponent,
        LogoComponent,
        ReactiveFormsModule
    ],
    imports: [CommonModule
        ,IonicModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class SharedModule {}