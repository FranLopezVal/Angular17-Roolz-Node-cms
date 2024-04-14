
import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef, Inject, OnInit, Renderer2, Type, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { UserCredential } from 'firebase/auth';
import { SessionService } from '../../Core/Services/session.service';
import { ButtonMenuUI } from '../../Shared/Components/menubutton.ui/menubutton.ui';
import { NodeOperatorUI } from '../../Shared/Components/Nodes/operator/node.operator.ui';
import { NodePrimigenUI } from '../../Shared/Components/Nodes/behaviours/primigen/node.primigen.ui';
import { NodeConstantUI } from '../../Shared/Components/Nodes/constant/node.constant.ui';
import { ConnectionUI } from '../../Shared/Components/Nodes/behaviours/connection/connection.node.ui';
import { NodeArrayUI } from '../../Shared/Components/Nodes/array/node.array.ui';
import { NodeArrayOperatorUI } from '../../Shared/Components/Nodes/ArrayOperator/node.arrayoperator.ui';
import { NodeConsoleOutputUI } from '../../Shared/Components/Nodes/consoleoutput/node.consoleoutput.ui';

@Component({
    selector: 'mod-containerview',
    templateUrl: './containerview.component.html'
})
export class containerviewComponent implements OnInit, AfterViewInit {
    // vcr = inject(ViewContainerRef);


    public static Instance: containerviewComponent;

    public static REAL_TIME_UPDATE_BEZIERS = true;

    private _user: UserCredential | null = null;
    @ViewChild('_app', { read: ViewContainerRef }) App: ViewContainerRef | null = null;
    @ViewChild('_container') Container: ElementRef | null = null;

    @ViewChild('btnnode') btnnode?: ButtonMenuUI;
    @ViewChild('btnftp') btnftp?: ButtonMenuUI;
    @ViewChild('btndb') btndb?: ButtonMenuUI;
    @ViewChild('btnops') btnops?: ButtonMenuUI;

    Nodes: Set<ComponentRef<NodePrimigenUI>> = new Set<ComponentRef<NodePrimigenUI>>();

    constructor(private session: SessionService,
        private renderer: Renderer2,
        private el: ElementRef) {
        // Esta clase hay que añadirla al componente directamente, pero como se carga por router-outlet
        // este es el metodo mas sencillo
        this.el?.nativeElement.classList.add('appContent');
        containerviewComponent.Instance = this;
    }
    ngAfterViewInit(): void {
        this.changeBackground(32, 'rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)');

        this.btnnode?.AddMenu(
            {
                id: 0, text: 'Constant', icon: 'radio_button_unchecked', action: () => {
                    this.AddNode(NodeConstantUI);
                }, levelChild: 1
            }
        );
        this.btnnode?.AddMenu(
            {
                id: 0, text: 'Array', icon: 'data_array', action: () => {
                    this.AddNode(NodeArrayUI);
                }, levelChild: 1
            }
        );
        this.btnnode?.AddMenu(
            {
                id: 1, text: 'Operator', icon: 'function', action: () => {
                    this.AddNode(NodeOperatorUI);
                }, levelChild: 1
            }
        );
        this.btnnode?.AddMenu(
            {
                id: 1, text: 'Array Operator', icon: 'function', action: () => {
                    this.AddNode(NodeArrayOperatorUI);
                }, levelChild: 1
            }
        );
        this.btnnode?.AddMenu(
            {
                id: 1, text: 'Data Output', icon: 'analytics', action: () => {
                    this.AddNode(NodeConsoleOutputUI);
                }, levelChild: 1
            }
        );
    }

    ngOnInit(): void {
        this._user = this.session.currentSession;
    }


    public get UserIsLogged(): boolean {
        return this.session.userIsLogged();
    }

    public AddNode<T extends NodePrimigenUI>(node: Type<T>)
    {
        if(this.App == null) return;
        const compRef = this.App.createComponent<T>((node));
        compRef.instance._name = `Node>${this.Nodes.size}`;
        compRef.instance._id = this.Nodes.size;
        compRef.instance.SetRef(compRef);

        const bounds = this.GetBoundingBoxNodes();
        compRef.instance.Position = { X: bounds.R + 200, Y: bounds.Y };
        compRef.instance.MoveTo(this.GetBoundingBoxNodes().R + 10, this.GetBoundingBoxNodes().Y);

        this.renderer.listen(compRef.location.nativeElement, 'mousedown', (event) => {
            // if (this.MouseOnCanvas(event)) return;
            compRef.instance.onMouseDown(event);
        });

        this.renderer.listen(compRef.location.nativeElement, 'mousemove', (event) => {
            // if (this.MouseOnCanvas(event)) return;
            compRef.instance.onMouseMove(event);
        });
        this.renderer.listen(compRef.location.nativeElement, 'mouseup', (event) => {
            // if (this.MouseOnCanvas(event)) return;
            compRef.instance.onMouseUp(event);
        });
        this.renderer.listen(compRef.location.nativeElement, 'onblur', (event) => {
            // if (this.MouseOnCanvas(event)) return;
            compRef.instance.onBlur(event);
        });
        this.renderer.listen(compRef.location.nativeElement, 'mouseleave', (event) => {
            // if (this.MouseOnCanvas(event)) return;
            compRef.instance.onBlur(event);
        });

        this.Nodes.add(compRef);
        this.RefreshView();
    }

    public RefreshView() {
        if (this.App && this.Nodes?.size > 0) {
            this.Nodes.forEach((node) => {
                node.instance.NodeRepaint();
            });

        }
    }

    public GetBoundingBoxNodes(): { X: number, Y: number, W: number, H: number, R: number, B: number} {
        const offsetY = 140; // 132 is the height of the menu and header
        
        let minX = 0;
        let minY = 0;
        let maxX = 0;
        let maxY = 0;

        this.Nodes.forEach((node) => {
            const pos = node.instance.Position;
            const size = node.instance.Size;

            if (pos.X < minX) minX = pos.X;
            if (pos.Y < minY) minY = pos.Y;
            if (pos.X + size.W > maxX) maxX = pos.X + size.W;
            if (pos.Y + size.H > maxY) maxY = pos.Y + size.H;
        });

        return { X: minX, Y: minY + offsetY, W: maxX - minX, H: maxY - minY, R: maxX, B: maxY };
    }

    public MouseOnBounds(event: MouseEvent): boolean {
        const bounds = this.GetBoundingBoxNodes();
        return event.clientX > bounds.X && event.clientX < bounds.R && event.clientY > bounds.Y && event.clientY < bounds.B;
    }

    // TODO: NOT WORK CORRECTLY
    public MouseOnCanvas(event: MouseEvent): boolean {
        const offsetY = 132; // 132 is the height of the menu and header
        const canvas = this.Container?.nativeElement.getBoundingClientRect();
        return event.clientX > canvas?.left && event.clientX < canvas?.right && event.clientY > canvas?.top + offsetY && event.clientY < canvas?.bottom;
    }
    

    public changeBackground(size: number, color: string, color2: string) {
        if (this.Container) {
            this.Container.nativeElement.style.backgroundSize = `${size}px ${size}px`;
            this.Container.nativeElement.style.backgroundImage = `linear-gradient(to right, ${color} 1px, ${color2} 1px),
            linear-gradient(to bottom, ${color} 1px, ${color2} 1px)`;
        }
    }

    public SaveNodesStructInFile() {
        console.log(JSON.stringify(this.Nodes));
        const filename = 'nodes.json';
        const fileData = JSON.stringify(this.Nodes, null, 2);
        const blob = new Blob([fileData], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        a.remove();
    }

    public LoadNodesStructFromFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (event) => {
            const target = event.target as HTMLInputElement;
            const file = target.files?.item(0);
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target?.result as string;
                    const nodes = JSON.parse(result) as Array<ComponentRef<NodePrimigenUI>>;
                    nodes.forEach((node) => {
                        this.Nodes.add(node);
                    });
                    this.RefreshView();
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

}




/* child: [ // MENU CHILD
//     { id: 1, text: 'Express', action: () => { console.log('Express'); }, levelChild: 2 },
//     // {
//     //     id: 2, text: 'NestJS', action: () => { console.log('NestJS'); }, levelChild: 2,
//     //     child: [
//     //         { id: 1, text: 'Super nest 2000', action: () => { console.log('Super nest 2000'); }, levelChild: 3 },
//     //         { id: 2, text: 'No tan super', action: () => { console.log('No tan super'); }, levelChild: 3 },
//     //     ]
//     // },
//     { id: 3, text: 'Socket.io', action: () => { console.log('Socket.io'); }, levelChild: 2 }] */