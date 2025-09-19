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
	safePassword:upinn.tech.safepasswordlib.SafePassword;
	password:string="";
	password_fuerza:upinn.tech.safepasswordlib.PasswordStrength;
	private cdRef = inject(ChangeDetectorRef);
  	constructor() {
    	// Setup large titles on iOS
		this.page.on('loaded', (args) => {
			if (__IOS__) {
				const navigationController: UINavigationController = this.page.frame.ios.controller
				navigationController.navigationBar.prefersLargeTitles = true
			}

		})
		this.safePassword = new upinn.tech.safepasswordlib.SafePassword();
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
		this.password = this.safePassword.makePassword(this.length,this.includeUppercase,this.includeNumbers,this.includeSymbols);
		this.checkPassword();
	}

	checkPassword() {
		this.password_fuerza = this.safePassword.checkPassword(this.password)
	}

	actualizarFuerza(nuevaFuerza: string) {
		this.password_fuerza = nuevaFuerza;
		// Si actualizas la variable de una manera que Angular no detecta automáticamente (como inside de un setTimeout o una suscripción a un servicio muy específico), quizás necesites:
		// this.cdRef.detectChanges();
	}

	getStrengthClass(): string {
		switch (this.password_fuerza) {
			case upinn.tech.safepasswordlib.PasswordStrength.WEAK: return 'password-weak';
			case upinn.tech.safepasswordlib.PasswordStrength.MODERATE: return 'password-moderate';
			case upinn.tech.safepasswordlib.PasswordStrength.STRONG: return 'password-strong';
			default: return 'password-weak';
		}
	}

}
