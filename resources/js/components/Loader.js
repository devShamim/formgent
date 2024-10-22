import AntSkeleton from './Skeleton';

const DefaultLoader = () => {
	return <AntSkeleton active />;
};

export default function Loader( { isLoading, children, loader } ) {
	const Loader = loader ? loader : DefaultLoader;
	return isLoading ? <Loader /> : children;
}
