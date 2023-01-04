var documenterSearchIndex = {"docs":
[{"location":"reference/#Reference","page":"Reference","title":"Reference","text":"","category":"section"},{"location":"reference/#Interface-overview","page":"Reference","title":"Interface overview","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"The following tables give an overview of ImageMorphology interfaces","category":"page"},{"location":"reference/","page":"Reference","title":"Reference","text":"Structuring Element (SE)","category":"page"},{"location":"reference/","page":"Reference","title":"Reference","text":"name summary\nstrel convert between different SE representations\nstrel_type infer the SE type\nstrel_size get the minimal block size that contains the SE\nstrel_box construct a box-shaped SE, e.g., C8, C26 connectivity\nstrel_diamond construct a diamond-shaped SE, e.g., C4, C6 connectivity\nOffsetArrays.centered shift the array center to (0, 0, ..., 0)","category":"page"},{"location":"reference/#reference_se","page":"Reference","title":"Structuring element","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"Structuring element is the key concept in morphology. If you're not familiar with this, please read concept: structuring element first.","category":"page"},{"location":"reference/","page":"Reference","title":"Reference","text":"# conversion\nstrel\n\n# constructor\nstrel_box\nstrel_diamond\n\n# helpers\nstrel_type\nstrel_size\nImageMorphology.strel_ndims\nOffsetArrays.centered\nOffsetArrays.center\n\n## types\nImageMorphology.SEMask\nImageMorphology.SEOffset\nImageMorphology.SEDiamond\nImageMorphology.SEBox\nImageMorphology.SEDiamondArray\nImageMorphology.SEBoxArray","category":"page"},{"location":"reference/#ImageMorphology.strel","page":"Reference","title":"ImageMorphology.strel","text":"strel([T], X::AbstractArray)\n\nConvert structuring element (SE) X to appropriate presentation format with element type T. This is a useful tool to generate SE that most ImageMorphology functions understand.\n\nImageMorphology currently supports two commonly used representations:\n\nT=CartesianIndex: offsets to its center point. The output type is Vector{CartesianIndex{N}}.\nT=Bool: connectivity mask where true indicates connected to its center point. The output type is BitArray{N}.\n\njulia> se_mask = centered(Bool[1 1 0; 1 1 0; 0 0 0]) # connectivity mask\n3×3 OffsetArray(::Matrix{Bool}, -1:1, -1:1) with eltype Bool with indices -1:1×-1:1:\n 1  1  0\n 1  1  0\n 0  0  0\n\njulia> se_offsets = strel(CartesianIndex, se_mask) # displacement offsets to its center point\n3-element Vector{CartesianIndex{2}}:\n CartesianIndex(-1, -1)\n CartesianIndex(0, -1)\n CartesianIndex(-1, 0)\n\njulia> se = strel(Bool, se_offsets)\n3×3 OffsetArray(::BitMatrix, -1:1, -1:1) with eltype Bool with indices -1:1×-1:1:\n 1  1  0\n 1  1  0\n 0  0  0\n\nSee also strel_diamond and strel_box for SE constructors for two special cases.\n\n\n\n\n\n","category":"function"},{"location":"reference/#ImageMorphology.strel_box","page":"Reference","title":"ImageMorphology.strel_box","text":"strel_box(A; [r])\nstrel_box(size; [r=size .÷ 2])\n\nConstruct the N-dimensional structuring element (SE) with all elements in the local window connected. If image A is provided, then size=(3, 3, ...) is the default value for size.\n\njulia> img = rand(64, 64);\n\njulia> se = strel_box(img)\n3×3 ImageMorphology.SEBoxArray{2, UnitRange{Int64}} with indices -1:1×-1:1:\n 1  1  1\n 1  1  1\n 1  1  1\n\njulia> se = strel_box((5,5); r=(1,2))\n5×5 ImageMorphology.SEBoxArray{2, UnitRange{Int64}} with indices -2:2×-2:2:\n 0  0  0  0  0\n 1  1  1  1  1\n 1  1  1  1  1\n 1  1  1  1  1\n 0  0  0  0  0\n\nnote: specialization and performance\nThe box shape SEBox is a special type for which many morphology algorithms may provide efficient implementations. For this reason, if one tries to collect an SEBoxArray into other array types (e.g. Array{Bool} via collect), then a significant performance drop is very likely to occur.\n\nSee also strel and strel_box.\n\n\n\n\n\n","category":"function"},{"location":"reference/#ImageMorphology.strel_diamond","page":"Reference","title":"ImageMorphology.strel_diamond","text":"strel_diamond(A, [dims]; [r])\nstrel_diamond(size, [dims]; [r])\n\nConstruct the N-dimensional structuring element (SE) for a diamond shape.\n\nIf image A is provided, then size=(3, 3, ...) and (1, 2, ..., N) are the default values for size and dims. The diamond half-size r::Int will be maximum(size)÷2 if not specified.\n\njulia> img = rand(64, 64);\n\njulia> se = strel_diamond(img) # default size for image input is (3, 3)\n3×3 ImageMorphology.SEDiamondArray{2, 2, UnitRange{Int64}, 0} with indices -1:1×-1:1:\n 0  1  0\n 1  1  1\n 0  1  0\n\njulia> se = strel_diamond((5,5))\n5×5 ImageMorphology.SEDiamondArray{2, 2, UnitRange{Int64}, 0} with indices -2:2×-2:2:\n 0  0  1  0  0\n 0  1  1  1  0\n 1  1  1  1  1\n 0  1  1  1  0\n 0  0  1  0  0\n\njulia> se = strel_diamond(img, (1,)) # mask along dimension 1\n3×1 ImageMorphology.SEDiamondArray{2, 1, UnitRange{Int64}, 1} with indices -1:1×0:0:\n 1\n 1\n 1\n\njulia> se = strel_diamond((3,3), (1,)) # 3×3 mask along dimension 1\n3×3 ImageMorphology.SEDiamondArray{2, 1, UnitRange{Int64}, 1} with indices -1:1×-1:1:\n 0  1  0\n 0  1  0\n 0  1  0\n\nnote: specialization and performance\nThe diamond shape SEDiamond is a special type for which many morphology algorithms may provide much more efficient implementations. For this reason, if one tries to collect an SEDiamondArray into other array types (e.g. Array{Bool} via collect), then a significant performance drop is very likely to occur.\n\nSee also strel and strel_box.\n\n\n\n\n\n","category":"function"},{"location":"reference/#ImageMorphology.strel_type","page":"Reference","title":"ImageMorphology.strel_type","text":"strel_type(x)\n\nInfer the structuring element type for x.\n\n\n\n\n\n","category":"function"},{"location":"reference/#ImageMorphology.strel_size","page":"Reference","title":"ImageMorphology.strel_size","text":"strel_size(x)\n\nCalculate the minimal block size that contains the structuring element. The result will be a tuple of odd integers.\n\njulia> se = strel_diamond((5, 5); r=1)\n5×5 ImageMorphology.SEDiamondArray{2, 2, UnitRange{Int64}, 0} with indices -2:2×-2:2:\n 0  0  0  0  0\n 0  0  1  0  0\n 0  1  1  1  0\n 0  0  1  0  0\n 0  0  0  0  0\n\njulia> strel_size(se) # is not (5, 5)\n(3, 3)\n\njulia> strel(Bool, strel(CartesianIndex, se)) # because it only checks the minimal enclosing block\n3×3 OffsetArray(::BitMatrix, -1:1, -1:1) with eltype Bool with indices -1:1×-1:1:\n 0  1  0\n 1  1  1\n 0  1  0\n\njulia> se = [CartesianIndex(1, 1), CartesianIndex(-2, -2)];\n\njulia> strel_size(se) # is not (4, 4)\n(5, 5)\n\njulia> strel(Bool, se) # because the connectivity mask has to be odd size\n5×5 OffsetArray(::BitMatrix, -2:2, -2:2) with eltype Bool with indices -2:2×-2:2:\n 1  0  0  0  0\n 0  0  0  0  0\n 0  0  1  0  0\n 0  0  0  1  0\n 0  0  0  0  0\n\njulia> se = strel_diamond((5, 5), (1, ); r=1)\n5×5 ImageMorphology.SEDiamondArray{2, 1, UnitRange{Int64}, 1} with indices -2:2×-2:2:\n 0  0  0  0  0\n 0  0  1  0  0\n 0  0  1  0  0\n 0  0  1  0  0\n 0  0  0  0  0\n\njulia> strel_size(se)\n(3, 1)\n\n\n\n\n\n","category":"function"},{"location":"reference/#ImageMorphology.strel_ndims","page":"Reference","title":"ImageMorphology.strel_ndims","text":"strel_ndims(x)::Int\n\nInfer the dimension of the structuring element x\n\n\n\n\n\n","category":"function"},{"location":"reference/#OffsetArrays.centered","page":"Reference","title":"OffsetArrays.centered","text":"centered(A, cp=center(A)) -> Ao\n\nShift the center coordinate/point cp of array A to (0, 0, ..., 0). Internally, this is equivalent to OffsetArray(A, .-cp).\n\ncompat: OffsetArrays 1.9\nThis method requires at least OffsetArrays 1.9.\n\nExamples\n\njulia> A = reshape(collect(1:9), 3, 3)\n3×3 Matrix{Int64}:\n 1  4  7\n 2  5  8\n 3  6  9\n\njulia> Ao = OffsetArrays.centered(A); # axes (-1:1, -1:1)\n\njulia> Ao[0, 0]\n5\n\njulia> Ao = OffsetArray(A, OffsetArrays.Origin(0)); # axes (0:2, 0:2)\n\njulia> Aoo = OffsetArrays.centered(Ao); # axes (-1:1, -1:1)\n\njulia> Aoo[0, 0]\n5\n\nUsers are allowed to pass cp to change how \"center point\" is interpreted, but the meaning of the output array should be reinterpreted as well. For instance, if cp = map(last, axes(A)) then this function no longer shifts the center point but instead the bottom-right point to (0, 0, ..., 0). A commonly usage of cp is to change the rounding behavior when the array is of even size at some dimension:\n\njulia> A = reshape(collect(1:4), 2, 2) # Ideally the center should be (1.5, 1.5) but OffsetArrays only support integer offsets\n2×2 Matrix{Int64}:\n 1  3\n 2  4\n\njulia> OffsetArrays.centered(A, OffsetArrays.center(A, RoundUp)) # set (2, 2) as the center point\n2×2 OffsetArray(::Matrix{Int64}, -1:0, -1:0) with eltype Int64 with indices -1:0×-1:0:\n 1  3\n 2  4\n\njulia> OffsetArrays.centered(A, OffsetArrays.center(A, RoundDown)) # set (1, 1) as the center point\n2×2 OffsetArray(::Matrix{Int64}, 0:1, 0:1) with eltype Int64 with indices 0:1×0:1:\n 1  3\n 2  4\n\nSee also center.\n\n\n\n\n\n","category":"function"},{"location":"reference/#OffsetArrays.center","page":"Reference","title":"OffsetArrays.center","text":"center(A, [r::RoundingMode=RoundDown])::Dims\n\nReturn the center coordinate of given array A. If size(A, k) is even, a rounding procedure will be applied with mode r.\n\ncompat: OffsetArrays 1.9\nThis method requires at least OffsetArrays 1.9.\n\nExamples\n\njulia> A = reshape(collect(1:9), 3, 3)\n3×3 Matrix{Int64}:\n 1  4  7\n 2  5  8\n 3  6  9\n\njulia> c = OffsetArrays.center(A)\n(2, 2)\n\njulia> A[c...]\n5\n\njulia> Ao = OffsetArray(A, -2, -2); # axes (-1:1, -1:1)\n\njulia> c = OffsetArrays.center(Ao)\n(0, 0)\n\njulia> Ao[c...]\n5\n\nTo shift the center coordinate of the given array to (0, 0, ...), you can use centered.\n\n\n\n\n\n","category":"function"},{"location":"reference/#ImageMorphology.SEMask","page":"Reference","title":"ImageMorphology.SEMask","text":"SEMask{N}()\n\nA (holy) trait type for representing structuring element as connectivity mask. This connectivity mask SE is a bool array where true indicates that pixel position is connected to the center point.\n\njulia> se = centered(Bool[0 1 0; 1 1 1; 0 1 0]) # commonly known as C4 connectivity\n3×3 OffsetArray(::Matrix{Bool}, -1:1, -1:1) with eltype Bool with indices -1:1×-1:1:\n 0  1  0\n 1  1  1\n 0  1  0\n\njulia> strel_type(se)\nImageMorphology.SEMask{2}()\n\nSee also SEOffset for the displacement offset representation. More details can be found on he documentation page Structuring Element.\n\n\n\n\n\n","category":"type"},{"location":"reference/#ImageMorphology.SEOffset","page":"Reference","title":"ImageMorphology.SEOffset","text":"SEOffset{N}()\n\nA (holy) trait type for representing structuring element as displacement offsets. This displacement offsets SE is an array of CartesianIndex where each element stores the displacement offset from the center point.\n\njulia> se = [CartesianIndex(-1, 0), CartesianIndex(0, -1), CartesianIndex(1, 0), CartesianIndex(0, 1)]\n4-element Vector{CartesianIndex{2}}:\n CartesianIndex(-1, 0)\n CartesianIndex(0, -1)\n CartesianIndex(1, 0)\n CartesianIndex(0, 1)\n\njulia> strel_type(se)\nImageMorphology.SEOffset{2}()\n\nSee also SEMask for the connectivity mask representation. More details can be found on he documentation page Structuring Element.\n\n\n\n\n\n","category":"type"},{"location":"reference/#ImageMorphology.SEDiamond","page":"Reference","title":"ImageMorphology.SEDiamond","text":"SEDiamond{N}(axes, [dims]; [r])\n\nA (holy) trait type for the N-dimensional diamond shape structuring element. This is a special case of SEMask that ImageMorphology algorithms might provide optimized implementation.\n\nIt is recommended to use strel_diamond and strel_type:\n\njulia> using OffsetArrays: centered\n\njulia> se = strel_diamond((3, 3)) # C4 connectivity\n3×3 ImageMorphology.SEDiamondArray{2, 2, UnitRange{Int64}, 0} with indices -1:1×-1:1:\n 0  1  0\n 1  1  1\n 0  1  0\n\njulia> strel_type(se)\nImageMorphology.SEDiamond{2, 2, UnitRange{Int64}}((-1:1, -1:1), (1, 2), 1)\n\njulia> se = centered(collect(se)) # converted to normal centered array\n3×3 OffsetArray(::Matrix{Bool}, -1:1, -1:1) with eltype Bool with indices -1:1×-1:1:\n 0  1  0\n 1  1  1\n 0  1  0\n\njulia> strel_type(se)\nImageMorphology.SEMask{2}()\n\n\n\n\n\n","category":"type"},{"location":"reference/#ImageMorphology.SEBox","page":"Reference","title":"ImageMorphology.SEBox","text":"SEBox{N}(axes; [r])\n\nThe N-dimensional structuring element with all elements connected. This is a special case of SEMask that ImageMorphology algorithms might provide optimized implementation.\n\nIt is recommended to use strel_box and strel_type:\n\njulia> using OffsetArrays: centered\n\njulia> se = strel_box((3, 3)) # C8 connectivity\n3×3 ImageMorphology.SEBoxArray{2, UnitRange{Int64}} with indices -1:1×-1:1:\n 1  1  1\n 1  1  1\n 1  1  1\n\njulia> strel_type(se)\nImageMorphology.SEBox{2, UnitRange{Int64}}((-1:1, -1:1), (1, 1))\n\njulia> se = centered(collect(se)) # converted to normal centered array\n3×3 OffsetArray(::Matrix{Bool}, -1:1, -1:1) with eltype Bool with indices -1:1×-1:1:\n 1  1  1\n 1  1  1\n 1  1  1\n\njulia> strel_type(se)\nImageMorphology.SEMask{2}()\n\n\n\n\n\n","category":"type"},{"location":"reference/#ImageMorphology.SEDiamondArray","page":"Reference","title":"ImageMorphology.SEDiamondArray","text":"SEDiamondArray(se::SEDiamond)\n\nThe instantiated array object of SEDiamond.\n\n\n\n\n\n","category":"type"},{"location":"reference/#ImageMorphology.SEBoxArray","page":"Reference","title":"ImageMorphology.SEBoxArray","text":"SEBoxArray(se::SEBox)\n\nThe instantiated array object of SEBox.\n\n\n\n\n\n","category":"type"},{"location":"#ImageMorphology.jl","page":"ImageMorphology.jl","title":"ImageMorphology.jl","text":"","category":"section"},{"location":"","page":"ImageMorphology.jl","title":"ImageMorphology.jl","text":"This package provides morphology-related functionalities for structure analysis and image processing.","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"using ImageMorphology\nusing ImageBase\nusing TestImages","category":"page"},{"location":"structuring_element/#concept_se","page":"Structuring element","title":"Structuring element","text":"","category":"section"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"Structuring Element (SE) is the key concept in morphology to indicate the connectivity and the neighborhood. This page explains this structuring element concept, and how ImageMorphology supports the general SEs without compromising the performance on the most commonly used special SE cases.","category":"page"},{"location":"structuring_element/#The-erosion-example","page":"Structuring element","title":"The erosion example","text":"","category":"section"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"The erosion erode function in its simplest 1-dimensional case can be defined as","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"varepsilon_Ap = min(Ap-1 Ap Ap+1)","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"Because the output value at position p not only depends on its own pixel A[p] but also on its neighborhood values A[p-1] and A[p+1], we call this type of operation a neighborhood image transformation.","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"Now comes the question: if we try to generalize the erode function, what should we do? – we would like to generalize the concept of \"neighborhood\".","category":"page"},{"location":"structuring_element/#Two-neighborhood-representations","page":"Structuring element","title":"Two neighborhood representations","text":"","category":"section"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"By saying \"Omega_p is the neighborhood of p\", we are expressing p in Ωₚ in plain Julia. For performance consideration, this Ωₚ is usually generated from the (p, Ω) pair. p is the center point that changes during the iteration, and Ω is usually a pre-defined and unchanged data which contains the neighborhood and shape information. We call this Ω a structuring element. There are usually two ways to express Ω:","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"displacement offset: a list of CartesianIndex to inidcate the offset to the center point p\nconnectivity mask: a bool array mask to indicate the connectivity to the center point p","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"For instance, in the following code block we build a commonly named C4 connectivity in the 2-dimensional case:","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"# displacement offset\nΩ_offsets = [\n    CartesianIndex(-1, 0),\n    CartesianIndex(0, -1),\n    CartesianIndex(0, 1),\n    CartesianIndex(1, 0),\n]\n\n# connectivity mask\nΩ_bool = Bool[\n    0 1 0\n    1 1 1\n    0 1 0\n]\nnothing #hide","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"If p=CartesianIndex(3, 3), then we know p=CartesianIndex(3, 4) is in Ωₚ.","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"Now, back to the erosion example. Based on the displacement offset representation, the simplest generic version of erode can be implemented quite simply:","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"# For illustration only, performance can be greatly improved using iteration to eliminate allocations\nfunction my_erode(A, Ω)\n    out = similar(A)\n    R = CartesianIndices(A)\n    for p in R\n        Ωₚ = filter!(q->in(q, R), Ref(p) .+ Ω)\n        # here we don't assume p in Ωₚ\n        out[p] = min(A[p], minimum(A[Ωₚ]))\n    end\n    return out\nend\nnothing #hide","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"using ImageMorphology\nusing ImageBase\nusing TestImages\n\nimg = Gray.(testimage(\"morphology_test_512\"))\nimg = Gray.(img .< 0.8)\nimg_e = my_erode(img, Ω_offsets)\nmosaic(img, img_e; nrow=1)","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"As you may realize, the displacement offset representation is convenient to use when implementing algorithms, but it is hard to visualize. In contrast, the connectivity mask is not so convenient to use when implementing algorithms, but it is easy to visualize. For instance, one can very easily understand the following SE at the first glance:","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"Ω = Bool[1 1 1; 1 1 0; 0 0 0] # hide","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"but not","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"strel(CartesianIndex, Ω) # hide","category":"page"},{"location":"structuring_element/#The-strel-function","page":"Structuring element","title":"The strel function","text":"","category":"section"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"This package supports the conversion between different SE representations via the strel helper function. strel is the short name for \"STRucturing ELement\".","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"To convert a connectivity mask representation to displacement offset representation:","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"Ω_mask = Bool[1 1 1; 1 1 0; 0 0 0] |> centered\nΩ_offsets = strel(CartesianIndex, Ω_mask)","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"note: zero-centered mask\nThe mask array is expected to be zero-centered. That means, the axes of a 3×3 mask axes(se) should be (-1:1, -1:1). The centered function is used to shift the center point of the array to (0, 0, ..., 0).julia> A = centered([1 2 3; 4 5 6; 7 8 9])\n3×3 OffsetArray(::Matrix{Int64}, -1:1, -1:1) with eltype Int64 with indices -1:1×-1:1:\n 1  2  3\n 4  5  6\n 7  8  9\n\njulia> A[-1, -1], A[0, 0], A[1, 1] # top-left, center, bottom-right\n(1, 5, 9)This centered function comes from OffsetArrays.jl and is also exported by ImageMorphology.","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"And to convert back from a displacement offset representation to connectivity mask representation:","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"strel(Bool, Ω_offsets)","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"Quite simple, right? Thus to make our my_erode function more generic, we only need to add one single line:","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":" function my_erode(A, Ω)\n     out = similar(A)\n+    Ω = strel(CartesianIndex, Ω)\n     R = CartesianIndices(A)","category":"page"},{"location":"structuring_element/#Convenient-constructors","page":"Structuring element","title":"Convenient constructors","text":"","category":"section"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"Among all the SE possibilities, this package provides constructors for two commonly used cases:","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"diamond-like constructor: strel_diamond\nbox-like constructor: strel_box","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"strel_diamond((3, 3)) # immediate neighborhood: C4 connectivity\nstrel_diamond((3, 3), (1, )) # along the first dimension\nstrel_box((3, 3)) # all adjacent neighborhood: C8 connectivity\nstrel_box((3, 3), (1, ))","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"Utilizing these constructors, we can provide an easier-to-use my_erode(A, [dims]) interface by adding one more method:","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"my_erode(A, dims::Dims=ntuple(identity, ndims(A))) = my_erode(A, strel_diamond(A, dims))","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"tip: Performance tip: keep the array type\nFor the structuring element Ω generated from strel_diamond and strel_box, it is likely to hit a fast path if you keep its array type. For instance, erode(A, strel_diamond(A)) is usually faster than erode(A, Array(strel_diamond(A))) because more information of the Ω shape is passed to Julia during coding and compilation.","category":"page"},{"location":"structuring_element/#Performance-optimizations-and-the-strel_type-function","page":"Structuring element","title":"Performance optimizations and the strel_type function","text":"","category":"section"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"Thanks to Julia's multiple dispatch mechanism, we can provide all the optimization tricks without compromising the simple user interface. This can be programmatically done with the help of the strel_type function. For example, if you know a very efficient erode implementation for the C4 connectivity SE, then you can add it incrementally:","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"using ImageMorphology: MorphologySE, SEDiamond\n\nmy_erode(A, dims::Dims) = my_erode(A, strel_diamond(A, dims))\nmy_erode(A, Ω) = _my_erode(strel_type(Ω), A, Ω)\n\n# the generic implementation we've written above\nfunction _my_erode(::MorphologySE, A, Ω)\n   ...\nend\n\n# the optimized implementation for SE generated from `strel_diamond` function\nfunction _my_erode(::SEDiamond, A, Ω)\n   ...\nend\n\n# ... and other optimized versions, if there are","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"In essence, strel_type is a trait function to assist the dispatch and code design:","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"strel_type(Ω_mask)","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"It returns an internal object SEMask{2}(). This might look scary at first glance, but it's quite a simple lookup table that reflects our previous reasoning:","category":"page"},{"location":"structuring_element/","page":"Structuring element","title":"Structuring element","text":"representation element type strel_type\ndisplacement offset CartesianIndex SEOffset\nconnectivity mask Bool SEMask\nstrel_diamond Bool SEDiamond\nstrel_box Bool SEBox","category":"page"}]
}
