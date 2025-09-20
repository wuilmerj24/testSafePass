import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NO_ERRORS_SCHEMA, inject } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular'
import { on, Page, PropertyChangeData, Slider, Switch, Utils } from '@nativescript/core'
import { ItemService } from './item.service'

@Component({
	selector: 'ns-items',
	templateUrl: './items.component.html',
	imports: [NativeScriptCommonModule, NativeScriptRouterModule],
	schemas: [NO_ERRORS_SCHEMA],
	changeDetection:ChangeDetectionStrategy.Default
})
export class ItemsComponent {
	itemService = inject(ItemService)
	page = inject(Page)
	length:number=12;
	includeUppercase:boolean=false;
	includeNumbers:boolean=false;
	includeSymbols:boolean=false;
	safePasswordAndroid:upinn.tech.safepasswordlib.SafePassword;
	safePasswordiOS:SafePasswordW;
	password:string="";
	password_fuerzaAndroid:upinn.tech.safepasswordlib.PasswordStrength;
	password_fuerzaiOS;
	private cdRef = inject(ChangeDetectorRef);
  	constructor() {
    	// Setup large titles on iOS
		this.page.on('loaded', (args) => {
			if (__IOS__) {
				const navigationController: UINavigationController = this.page.frame.ios.controller
				navigationController.navigationBar.prefersLargeTitles = true
			}

		})
		if(__ANDROID__){
			this.safePasswordAndroid = new upinn.tech.safepasswordlib.SafePassword();
		}else if(__IOS__){
			this.safePasswordiOS = new SafePasswordW();
		}
  	}

	onValueChange(args: PropertyChangeData){
		const slider = args.object as Slider
		this.length=args.value;
	}
	
	onCheckChange(args: PropertyChangeData,from:number){
		if(from==0){
			this.includeUppercase = args.value;
		}else if(from==1){
			this.includeNumbers = args.value;
		}else{
			this.includeSymbols = args.value;
		}
	}
	

	getPassword() {
		if(__ANDROID__){
			this.password = this.safePasswordAndroid.makePassword(this.length,this.includeUppercase,this.includeNumbers,this.includeSymbols);
		}else if(__IOS__){
			this.password = this.safePasswordiOS.makePasswordWithLengthIncludeUppercaseIncludeNumbersIncludeSymbols(this.length,this.includeUppercase ? 1:0,this.includeNumbers ? 1:0,this.includeSymbols? 1:0);
		}
		this.checkPassword();
	}

	checkPassword() {
		if(__ANDROID__){
			this.password_fuerzaAndroid= this.safePasswordAndroid.checkPassword(this.password);
		}else if(__IOS__){
			this.password_fuerzaiOS=this.safePasswordiOS.checkPasswordWithPassword(this.password);
		}
	}

	actualizarFuerza(nuevaFuerza: string) {
		if(__ANDROID__){
			this.password_fuerzaAndroid = nuevaFuerza;
		}else if(__IOS__){
			this.password_fuerzaiOS = nuevaFuerza;
		}
	}

	getStrengthClass(): string {
		if(__ANDROID__){
			switch (this.password_fuerzaAndroid) {
				case upinn.tech.safepasswordlib.PasswordStrength.WEAK: return 'password-weak';
				case upinn.tech.safepasswordlib.PasswordStrength.MODERATE: return 'password-moderate';
				case upinn.tech.safepasswordlib.PasswordStrength.STRONG: return 'password-strong';
				default: return 'password-weak';
			}
		}else if(__IOS__){
			switch (this.password_fuerzaiOS) {
				case PasswordStrength.Weak: return 'password-weak';
				case PasswordStrength.Moderate: return 'password-moderate';
				case PasswordStrength.Strong: return 'password-strong';
				default: return 'password-weak';
			}
		}
	}


	changeValue(password_fuerzaiOS):String{
		if(parseInt(password_fuerzaiOS)==0){
			return "Weak"
		}else if(password_fuerzaiOS==1){
			return "Moderate"
		}else if(password_fuerzaiOS==2){
			return "Strong"
		}else{
			return ""
		}
	}
}
