import { Link } from "@inertiajs/react"
import { ArrowLeftIcon } from "@heroicons/react/16/solid"
import { Form } from "@inertiajs/react"

export default function Edit({apar}){
    return (
        <section className="py-6 px-4">
            <div className="flex justify-between">
                <h1 className="font-bold text-lg">Buat Data Apar</h1>
                <Link href="/apars" className="btn btn-warning"><ArrowLeftIcon className="size-4" /> Back</Link>
            </div>
            <Form 
                action={`/apars/${apar.id}`} 
                method="put"
                className="flex gap-4 w-10/12 mx-auto"
            >
                {({
                    errors, 
                    processing
                }) => (
                    <>
                        <div className="flex flex-col gap-4 w-full md:w-8/12 mx-auto">
                            <fieldset className="fieldset">
                                <label className="fieldset-legend" htmlFor="merk">Merk</label>
                                <input type="text" defaultValue={apar.merk} id="merk" name="merk" className="input w-full" placeholder="Merk Apar" autoComplete="off"/>
                                {errors.merk && <span className="text-red-600">{errors.merk}</span>}
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="fieldset-legend" htmlFor="kapasitas">Kapasitas</label>
                                <input 
                                    type="text" 
                                    inputMode="decimal" 
                                    defaultValue={apar.kapasitas} 
                                    id="kapasitas" 
                                    name="kapasitas" 
                                    className="input w-full" 
                                    placeholder="Kapasitas Apar" 
                                    autoComplete="off"
                                    onChange={(e) => {
                                        let val = e.target.value.replace(',', '.');
                                        val = val.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                                        e.target.value = val;
                                    }}
                                />
                                {errors.kapasitas && <span className="text-red-600">{errors.kapasitas}</span>}
                            </fieldset>
                            
                            <fieldset className="fieldset">
                                <label className="fieldset-legend" htmlFor="lokasi">Lokasi</label>
                                <input type="text" defaultValue={apar.lokasi} id="lokasi" name="lokasi" className="input w-full" placeholder="Lokasi Apar" autoComplete="off"/>
                                {errors.lokasi && <span className="text-red-600">{errors.lokasi}</span>}
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="fieldset-legend" htmlFor="starting_date">Starting Date</label>
                                <input type="date" defaultValue={apar.starting_date ? apar.starting_date.substr(0,10) : null} id="starting_date" name="starting_date" className="input w-full" placeholder="Starting Date Apar" autoComplete="off"/>
                                {errors.starting_date && <span className="text-red-600">{errors.starting_date}</span>}
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="fieldset-legend" htmlFor="next_date">Next Date</label>
                                <input type="date" defaultValue={apar.next_date ? apar.next_date.substr(0,10) : null} id="next_date" name="next_date" className="input w-full" placeholder="Next Date Apar" autoComplete="off"/>
                                {errors.next_date && <span className="text-red-600">{errors.next_date}</span>}
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="fieldset-legend" htmlFor="type">Tipe Apar</label>
                                <select className="select w-full" name="type" id="type" defaultValue={apar.type}>
                                    <option value="dry chemical powder">Dry Chemical Powder (Serbuk Kimia Kering)</option>
                                    <option value="co2">Carbon Dioxide / CO₂ (Karbon Dioksida)</option>
                                    <option value="foam">Foam / AFFF (Busa Kimia)</option>
                                    <option value="liquid">Liquid Gas / Clean Agent</option>
                                    <option value="wet chemical">Wet Chemical</option>
                                </select>
                                {errors.type && <span className="text-red-600">{errors.type}</span>}
                            </fieldset>
                            

                            <button className="btn btn-primary" type="submit" disabled={processing}>
                                {processing ? "Prosess.." : "Submit" }
                            </button>
                        </div>
                    </>
                )}
            </Form>
        </section>
    )
}