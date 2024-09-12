import Select from 'react-select';

export default function refreshTime() {

   return (
      <Select
         className="outline-none"
         isSearchable={false}
         options={[
            { value: 15, label: '15s' },
            { value: 30, label: '30s' },
            { value: 60, label: '1m' },
            { value: 0, label: 'Off' }
         ]}
         defaultValue={{ value: 15, label: '15s' }}
         styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: '#1f2937',
            }),
         }}
         theme={(theme) => ({
            ...theme,
            colors: {
               ...theme.colors,
               //after select dropdown option
               primary50: "#9ca3af",
               //Border and Background dropdown color
               primary: "#9ca3af",
               //Background hover dropdown color
               primary25: "#9ca3af",
               //Background color
               //neutral0: "#1f2937",
               //Border before select
               neutral20: "#9ca3af",
               //Hover border
               neutral30: "#9ca3af",
               //No options color
               neutral40: "#9ca3af",
               //Select color
               neutral50: "#9ca3af",
               //arrow icon when click select
               neutral60: "#9ca3af",
               //Text color
               neutral80: "#9ca3af",
               //Text color when hover
               neutral90: "#9ca3af",
            }
         })}
      />
   );
}