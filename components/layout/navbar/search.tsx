import InputSearchBar from './search-input';

export default function SearchBar() {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const [searchValue, setSearchValue] = useState('');
  // const [quickParams, setQuickParams] = useState(new URLSearchParams());

  // useEffect(() => {
  //   setSearchValue(searchParams?.get('q') || '');
  // }, [searchParams, setSearchValue]);

  // async function onChangeSearch(e: ChangeEvent<HTMLInputElement>) {
  //   setSearchValue(e.target.value);
  //   console.log(e.target.value);
  //   const product = await getProduct('air force 1 cactus');
  //   console.log(product);
  //   const search = e.target as HTMLInputElement;
  //   const newQuickParams = new URLSearchParams(quickParams.toString());

  //   if (search.value) {
  //     newQuickParams.set('q', search.value);
  //   } else {
  //     newQuickParams.delete('q');
  //   }

  //   setQuickParams(newQuickParams); // Update quickParams with the newQuickParams
  // }

  // function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();

  //   const val = e.target as HTMLFormElement;
  //   const search = val.search as HTMLInputElement;
  //   const newParams = new URLSearchParams(searchParams.toString());

  //   if (search.value) {
  //     newParams.set('q', search.value);
  //   } else {
  //     newParams.delete('q');
  //   }

  //   router.push(createUrl('/search', newParams));
  // }
  // console.log(quickParams.get('q'));

  return (
    <>
      <InputSearchBar />
      {/* 
<Suspense>
  <SearchQuick /> 
    </Suspense> */}
    </>
  );
}
