import React from "react";
import './mult.css'

export class MultiSelect extends React.Component {

    constructor() {
        super();
        this.state = {
            selected:[],
            allCountries:[
            ],
            allCountryGot:[],
            search:''
        }
    }

    componentDidMount(){
        fetch("http://127.0.0.1:5000/")
        .then(res=>res.json())
        .then((result)=>{
            this.setState(()=>{
                this.state.allCountryGot=result;
                this.state.allCountries=result;
            })
            this.forceUpdate()
        })



        
    }


    OnSelect =(country)=>{
        var allse = this.state.selected;
        if(!allse.includes(country)){
            allse.push(country)
        }
        this.setState(()=>{
            this.state.selected=allse;
            this.state.search='';
        })
        this.Onsearch('')
        this.forceUpdate()
    }

    Ondelete = (country)=>{
        var allse = this.state.selected;
        if(allse.includes(country)){
            var index = allse.indexOf(country);
            allse.splice(index,1);
        }
        this.forceUpdate()
    }

    Onsearch = (text)=>{
        var allcountry = this.state.allCountries;
        var searchre = [];
        if(text===''){
            this.setState(()=>{
                this.state.allCountryGot=allcountry;
            })
        }
        allcountry.map((item)=>{
            if(item.name.toLocaleLowerCase().includes(text)){
                searchre.push(item);
            }
        })
        this.setState(()=>{
            this.state.allCountryGot=searchre;
        })
        this.forceUpdate()
        
    }






    render() {
        return (
            <div className="h-screen overflow-hidden flex items-center justify-center box">
                <div class="w-full md:w-1/2 flex flex-col items-center h-64 mx-auto">
                <div class="w-full px-4">
                    <div class="flex flex-col items-center relative">
                        <div class="w-full  svelte-1l8159u">
                            <div class="my-2 p-1 flex border border-gray-200 bg-white rounded svelte-1l8159u">
                                <div class="flex flex-auto flex-wrap">
                                    {this.state.selected.map((item,index)=>(
                                        <div class="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                                        <div class="text-xs font-normal leading-none max-w-full flex-initial">{item.name}</div>
                                        <div class="flex flex-auto flex-row-reverse">
                                            <div onClick={event=>{this.Ondelete(item)}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2">
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                    <div class="flex-1">
                                        <input placeholder="" class="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800" onChange={(e)=>{
                                            this.Onsearch(e.target.value)
                                        }}
                                        />
                                    </div>
                                </div>
                                <div class="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u">
                                    <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up w-4 h-4">
                                            <polyline points="18 15 12 9 6 15"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="absolute shadow top-100 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
                            <div class="flex flex-col w-full">
                                
                                {this.state.allCountryGot.map((item,index)=>(
                                    <div class="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100" onClick={event=>{this.OnSelect(item)}}>
                                        <div class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                                            <div class="w-full items-center flex">
                                                <img src={item.img} style={{width:'20px'}}/>
                                                <div class="mx-2 leading-6  ">{item.name} </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}